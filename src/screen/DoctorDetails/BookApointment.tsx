import {useNavigation} from '@react-navigation/native';
import {default as React, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {showtimefromstring} from '../../Appfunction';
import Color from '../../asset/Color';
import Address from '../../component/Address';
import Btn from '../../component/Btn';
import Navbar from '../../component/Navbar';
import {useBookslot} from '../../customhook/useBookslot';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import type {RootState} from '../../redux/Store';
import {BookSlotRequest, ClinicWithAddressAndImage, Slot} from '../../types';
import {DateCard} from './DateCard';
import SlotCard from './SlotCard';
import {useGetDoctor} from './useDoctorQuery';
import {useGetBookingAvailability} from './useGetBookingAvailability';
import openMap from 'react-native-open-maps';
import {commonStyles} from '../../asset/styles';

interface DateObj {
  date: number;
  month: number;
  day: number;
  senddate: string;
}

export default function BookApointment(props: {route: any}) {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<DateObj | undefined>(
    undefined,
  );
  const [selectedtime, setSelectedtime] = useState<
    (Slot & {id: string}) | undefined
  >(undefined);
  const [datelist, setdatelist] = useState<DateObj[]>([]);
  const {data: doctorDetails} = useGetDoctor(props.route.params?.id);
  const [selectedclinic, setselectedclinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);

  const {mutate: bookSlot} = useBookslot({
    onSuccess: () => {
      Alert.alert('Booked Successfully.', '', [
        {text: 'Ok', onPress: () => navigation.goBack()},
      ]);
    },
  });

  let {data: cliniclist} = useGetcliniclist(
    {doctor_id: customerdata.doctor.id},
    data => {
      setselectedclinic(data?.[0]);
    },
  );
  useEffect(() => {
    let localdaylist = [];

    for (let i = 0; i < 15; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);

      let obj = {
        date: d.getDate(),
        month: d.getMonth(),
        day: d.getDay(),
        senddate:
          d.getFullYear() +
          '-' +
          ('0' + (d.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + d.getDate()).slice(-2),
      };

      localdaylist.push(obj);
    }

    setdatelist(localdaylist);
    setselecteddate(localdaylist?.[0]);
  }, []);

  const {data: bookingAvailability} = useGetBookingAvailability({
    doctor_id: customerdata.doctor.id,
    clinic_id: selectedclinic?.id ?? '',
    date: new Date(selecteddate?.senddate + 'T00:00:00Z').getTime(),
  });

  const timeSlots = useMemo(
    () =>
      bookingAvailability?.map(i => ({
        ...i,
        title:
          showtimefromstring(i.fromtime) +
          ' To ' +
          showtimefromstring(i.totime),
        data: i.slots.map(j => {
          return {...j, id: i.workingtime_id};
        }),
      })),
    [bookingAvailability],
  );

  async function bookapointmenthandler() {
    try {
      const Appointment_date = new Date(
        `${selecteddate?.senddate}T00:00:00Z`,
      ).getTime();

      let bookslotpayload: BookSlotRequest = {
        customer_id: Appstate.userid,
        doctor_clinic_id: selectedclinic?.clinic_doctor_id ?? '',
        slot_index: selectedtime?.index ?? 0,
        workingtime_id: selectedtime?.id ?? '',
        group_id: uuid.v4().toString(),
        payment_order_id: uuid.v4().toString(),
        appointment_date: Appointment_date,
      };
      if (props?.route?.params?.existing_appointment) {
        bookslotpayload.existing_booking_id =
          props?.route?.params?.existing_appointment.id;
      }

      console.log('bookslotpayload', bookslotpayload);

      bookSlot(bookslotpayload);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Navbar title="Doctor Details" />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          gap: 10,
          marginHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <View style={{flex: 1.5}}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: 130,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              source={
                doctorDetails?.profile_image
                  ? {
                      uri: doctorDetails?.profile_image,
                    }
                  : require('../../asset/image/doctor.webp')
              }
            />
          </View>

          <View style={{flex: 2}}>
            <Text style={[commonStyles.font20, commonStyles.weight700]}>
              Dr.{doctorDetails?.name}
            </Text>
            <Text style={commonStyles.font18}>{doctorDetails?.speciality}</Text>
            <View style={{flexDirection: 'column', marginTop: 5}}>
              <Text style={commonStyles.font16}>
                Bookings: {doctorDetails?.no_of_bookings}
              </Text>
              <Text style={commonStyles.font16}>
                Degree: {doctorDetails?.degree}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 16,
              fontWeight: '800',
            }}>
            About
          </Text>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
            }}>
            {doctorDetails?.about}
          </Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          {cliniclist?.map(clinic => {
            return (
              <View key={clinic.id} style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectedclinic?.clinic_doctor_id ==
                      clinic.clinic_doctor_id
                        ? Color.primary
                        : Color.secondary,
                    borderRadius: 10,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setselectedclinic(clinic);
                  }}>
                  <Text style={{textAlign: 'center'}}>{clinic.name}</Text>
                  <Address details={clinic.address} compact={true} />
                </TouchableOpacity>
                {true && (
                  <TouchableOpacity
                    style={{
                      right: 0,
                      position: 'absolute',
                      top: 0,
                      height: '100%',
                    }}
                    onPress={() =>
                      openMap({
                        latitude: clinic.address.lat,
                        longitude: clinic.address.lan,
                      })
                    }>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        height: '100%',
                      }}>
                      <Icon name="navigate" size={20} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
        <View>
          <FlatList
            horizontal
            data={datelist}
            renderItem={({item: i}) => (
              <DateCard
                key={`${i.date}_${i.day}_${i.month}`}
                {...{
                  setselectedtime: setSelectedtime,
                  setselecteddate,
                  selecteddate,
                  i,
                }}
              />
            )}
          />
        </View>

        <View
          style={{
            flex: 4,
            flexDirection: 'column',
          }}>
          {!!timeSlots?.length ? (
            <>
              <ScrollView>
                {timeSlots.map(timeSlot => (
                  <View key={timeSlot.workingtime_id}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        marginTop: 10,
                        color: 'black',
                        fontWeight: '600',
                      }}>
                      {timeSlot.title}
                    </Text>
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {timeSlot.data.map(slot => (
                        <View
                          style={{width: '20%'}}
                          id={`${slot?.id}_${slot.index}`}>
                          <SlotCard
                            slot={slot}
                            isSelected={
                              selectedtime?.id == slot.id &&
                              selectedtime?.index == slot.index
                            }
                            onPress={slot => {
                              setSelectedtime(slot);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                No Slots available
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <View style={{marginHorizontal: 80}}>
            <Btn title="Book Apointment" onPress={bookapointmenthandler} />
          </View>
        </View>
      </View>
    </>
  );
}
