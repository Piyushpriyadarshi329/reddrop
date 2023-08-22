import {useNavigation} from '@react-navigation/native';
import {default as React, useEffect, useState, useMemo} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {getSlotwisetime, showtime, showtimefromstring} from '../../Appfunction';
import Color from '../../asset/Color';
import Navbar from '../../component/Navbar';
import {useBookslot} from '../../customhook/useBookslot';
import {useGetavailability} from '../../customhook/useGetavailability';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetOccupiedSlots} from '../../customhook/usegetOccupiedSlots';
import type {RootState} from '../../redux/Store';
import {DateCard} from './DateCard';
import {
  BookSlotRequest,
  ClinicDto,
  ClinicWithAddressAndImage,
  Slot,
} from '../../types';
import {useGetBookingAvailability} from './useGetBookingAvailability';
import Btn from '../../component/Btn';
import SlotCard from './SlotCard';

interface DateObj {
  date: number;
  month: number;
  day: number;
  senddate: string;
}

export default function BookApointment(data: {route: any}) {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<DateObj | undefined>(
    undefined,
  );
  const [selectedtime, setSelectedtime] = useState<
    (Slot & {id: string}) | undefined
  >(undefined);
  const [datelist, setdatelist] = useState<DateObj[]>([]);

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

    for (let i = 0; i < 7; i++) {
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
      if (data?.route?.params?.existing_appointment) {
        bookslotpayload.existing_booking_id =
          data?.route?.params?.existing_appointment.id;
      }

      console.log('bookslotpayload', bookslotpayload);

      bookSlot(bookslotpayload);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Navbar title="Doctor Details" />
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 10}}>
        <View style={{flex: 1.5}}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: 130,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require('../../asset/image/doctor.webp')}
          />
        </View>

        <View style={{flex: 2}}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '700',
            }}>
            Dr.{customerdata.doctor.name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontWeight: '600',
            }}>
            {'{{spilization}}'}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginTop: 3,
                marginRight: 5,
              }}>
              ____ Booking
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Icon name="map-marker-alt" size={20} color="black" />

            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginTop: 3,
                marginRight: 5,
              }}>
              ________ KM Away
            </Text>
          </View>
        </View>
      </View>

      <View style={{flex: 2, marginTop: 15, marginHorizontal: 20}}>
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
          .......................................
        </Text>
      </View>

      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
        {cliniclist?.map(clinic => {
          return (
            <TouchableOpacity
              key={clinic.id}
              style={{
                flex: 1,
                backgroundColor:
                  selectedclinic?.clinic_doctor_id == clinic.clinic_doctor_id
                    ? Color.primary
                    : Color.secondary,
                justifyContent: 'center',
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setselectedclinic(clinic);
              }}>
              <Text style={{textAlign: 'center'}}>{clinic.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          flex: 1.4,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        {datelist.map(i => {
          return (
            <DateCard
              key={`${i.date}_${i.day}_${i.month}`}
              {...{
                setselectedtime: setSelectedtime,
                setselecteddate,
                selecteddate,
                i,
              }}
            />
          );
        })}
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: 'column',
          marginTop: 20,
          marginHorizontal: 20,
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
  );
}
