import {useNavigation} from '@react-navigation/native';
import {default as React, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {slotwisetime} from '../../Appfunction';
import Color from '../../asset/Color';
import Navbar from '../../component/Navbar';
import {useBookslot} from '../../customhook/useBookslot';
import {useGetavailability} from '../../customhook/useGetavailability';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetOccupiedSlots} from '../../customhook/usegetOccupiedSlots';
import type {RootState} from '../../redux/Store';
import {DateCard} from './DateCard';

export default function BookApointment() {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<any>(null);
  const [selectedtime, setselectedtime] = useState<any>('');
  const [datelist, setdatelist] = useState<any>([]);
  const [timeslot, settimeslot] = useState([]);
  const [cliniclist, setcliniclist] = useState<any>([]);

  const [selectedclinic, setselectedclinic] = useState<any>('');

  const {data: getOccupiedSlotsres} = usegetOccupiedSlots({
    dateString: selecteddate.senddate,
    doctor_clinic_id: selectedclinic.clinic_doctor_id,
  });

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

  useEffect(() => {
    getcliniclist();
  }, []);

  useEffect(() => {
    if (selecteddate) {
      createslot();
    }
  }, [selecteddate, selectedclinic]);

  async function createslot() {
    try {
      let payload = {
        doctor_clinic_id: selectedclinic.clinic_doctor_id,
        dateString: selecteddate.senddate,
      };

      // let getOccupiedSlotsres = await usegetOccupiedSlots(payload);

      console.log('getOccupiedSlotsres', getOccupiedSlotsres);

      let clinicDayAvailabilities = availabilitylist?.filter(
        i =>
          i.week_day == selecteddate.day &&
          i.clinic_id == selectedclinic.clinic_id,
      );

      if (!!clinicDayAvailabilities?.length) {
        var localtimeslot: any = [];

        clinicDayAvailabilities?.map((clinicDayAvailability, index) => {
          let filterbookedslot = getOccupiedSlotsres?.filter(
            k => k.work_time_id == clinicDayAvailability.id,
          );
          console.log('filterbookedslot====>', filterbookedslot);

          let t1 = clinicDayAvailability.from_time;
          let t2 = clinicDayAvailability.to_time;
          let slot = clinicDayAvailability.no_of_slot;

          let newdata: any = slotwisetime(t1, t2, slot);

          // console.log('newdata', newdata);

          newdata.map((j: any, ind: any) => {
            let obj: any = {};

            obj.time = j;
            obj.id = clinicDayAvailability.id;
            obj.booked = false;
            if (!!filterbookedslot?.length) {
              if (filterbookedslot[0].occupiedSlots.includes(ind)) {
                obj.booked = true;
              }
            }

            console.log('obj', obj);

            localtimeslot.push(obj);
          });
        });

        console.log('localtimeslot', localtimeslot.length);

        settimeslot([...localtimeslot]);
      } else {
        settimeslot([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const {data: availabilitylist} = useGetavailability({
    doctor_id: customerdata.doctor.id,
  });

  async function getcliniclist() {
    try {
      let payload = {
        doctor_id: customerdata.doctor.id,
      };

      let res: any = await useGetcliniclist(payload);

      console.log('res cliniclist==>', res);
      if (res.data.length == 1) {
        setselectedclinic(res.data[0]);
        setcliniclist([]);
      } else {
        setcliniclist(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onBookingSuccess = () => {
    Alert.alert('Booked Successfully.', '', [
      {text: 'Ok', onPress: () => navigation.goBack()},
    ]);
  };
  async function bookapointmenthandler() {
    try {
      const Appointment_date = new Date(
        `${selecteddate.senddate}T00:00:00Z`,
      ).getTime();

      let bookslotpayload: {
        id: string | number[];
        customer_id: string;
        doctor_clinic_id: string;
        slot_index: number;
        workingtime_id: string;
        created_datetime: number;
        status: string;
        group_id: string | number[];
        modified_datetime: number;
        payment_order_id: string | number[];
        Appointment_date: string;
      } = {
        id: uuid.v4(),
        customer_id: Appstate.userid,
        doctor_clinic_id: selectedclinic.clinic_doctor_id,
        slot_index: selectedtime.index,
        workingtime_id: selectedtime.item.id,
        created_datetime: new Date().getTime(),
        status: 'BOOKED',
        group_id: uuid.v4(),
        modified_datetime: new Date().getTime(),
        payment_order_id: uuid.v4(),
        Appointment_date: Appointment_date,
      };

      await useBookslot(bookslotpayload);
      onBookingSuccess();
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
        {cliniclist.map((i: any) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor:
                  selectedclinic.clinic_doctor_id == i.clinic_doctor_id
                    ? Color.primary
                    : Color.secondary,
                justifyContent: 'center',
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setselectedclinic(i);
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {i.name}
              </Text>
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
              {...{
                setselectedtime,
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
        {timeslot.length > 0 ? (
          <FlatList
            data={[...timeslot]}
            keyExtractor={item => JSON.stringify(item)}
            renderItem={item => {
              console.log('item', item.item);
              return (
                <>
                  {item.item?.booked ? (
                    <TouchableOpacity
                      key={JSON.stringify(item.item?.time)}
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        marginTop: 10,
                        marginHorizontal: 5,
                        borderRadius: 5,

                        // backgroundColor:
                        //   selectedtime.item == item.item ? Color.primary : 'white',
                        backgroundColor: 'red',
                      }}
                      onPress={() => {
                        if (item.item?.booked) {
                          alert('Already booked');
                        } else {
                          setselectedtime(item);
                        }
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 16,
                            padding: 5,
                          }}>
                          Slot- {item.index + 1}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={JSON.stringify(item.item?.time)}
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        marginTop: 10,
                        marginHorizontal: 5,
                        borderRadius: 5,

                        backgroundColor:
                          selectedtime.item == item.item
                            ? Color.primary
                            : 'white',
                      }}
                      onPress={() => {
                        if (item.item?.booked) {
                          alert('Already booked');
                        } else {
                          setselectedtime(item);
                        }
                      }}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 16,
                            padding: 5,
                          }}>
                          Slot- {item.index + 1}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
            numColumns={4}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              No Slot is available
            </Text>
          </View>
        )}
      </View>
      <View style={{flex: 2}}>
        <View style={{marginHorizontal: 80}}>
          <Button
            title="Book Apointment"
            onPress={bookapointmenthandler}
            color={Color.primary}
          />
        </View>
      </View>
    </View>
  );
}
