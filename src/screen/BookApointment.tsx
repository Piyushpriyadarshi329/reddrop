import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Color from '../asset/Color';
import {useGetavailability} from '../customhook/useGetavailability';
import type {RootState} from './../redux/Store';
import {showtimefromstring, slotwisetime} from '../Appfunction';
import {useBookslot} from '../customhook/useBookslot';
import uuid from 'react-native-uuid';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {usegetOccupiedSlots} from '../customhook/usegetOccupiedSlots';

export default function BookApointment() {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<any>(null);
  const [selectedtime, setselectedtime] = useState<any>('');
  const [datelist, setdatelist] = useState<any>([]);
  const [availabilitylist, setavailabilitylist] = useState([]);
  const [timeslot, settimeslot] = useState([]);
  const [cliniclist, setcliniclist] = useState<any>([]);

  const [selectedclinic, setselectedclinic] = useState<any>('');

  console.log('Appsate', customerdata);

  let monthname = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AGU',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  let weekdayname = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
    console.log('localdaylist', localdaylist);

    setdatelist(localdaylist);
  }, []);

  useEffect(() => {
    getavailability();
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

      let getOccupiedSlotsres: any = await usegetOccupiedSlots(payload);

      console.log('getOccupiedSlotsres', getOccupiedSlotsres.data);

      let filterdata: any = availabilitylist.filter(
        (i: any) =>
          i.week_day == selecteddate.day &&
          i.clinic_id == selectedclinic.clinic_id,
      );

      // console.log('filterdata', filterdata);

      if (filterdata.length > 0) {
        var localtimeslot: any = [];

        filterdata.map((i, index) => {
          let filterbookedslot = getOccupiedSlotsres.data.filter(
            k => k.work_time_id == i.id,
          );
          console.log('filterbookedslot====>', filterbookedslot);

          let t1 = filterdata[index].from_time;
          let t2 = filterdata[index].to_time;
          let slot = filterdata[index].no_of_slot;

          let newdata: any = slotwisetime(t1, t2, slot);

          // console.log('newdata', newdata);

          newdata.map((j: any, ind: any) => {
            let obj: any = {};

            obj.time = j;
            obj.id = filterdata[index].id;
            obj.booked = false;
            if (filterbookedslot.length > 0) {
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

  async function getavailability() {
    try {
      let payload = {
        doctor_id: customerdata.doctor.id,
      };

      let res: any = await useGetavailability(payload);

      console.log('res', res);
      setavailabilitylist(res.data);
    } catch (error) {
      console.log(error);
    }
  }
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

      console.log('bookslotpayload', bookslotpayload);

      let bookslotres: any = await useBookslot(bookslotpayload);

      console.log('bookslotres', bookslotres);

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, marginTop: 10, flexDirection: 'row'}}>
        <View style={{marginLeft: 10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon1 name="arrow-back" size={30} color={Color.primary} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: -100}}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '800',
              textAlign: 'center',
            }}>
            Doctor Detail
          </Text>
        </View>
      </View>

      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 10}}>
        <View style={{flex: 1.5}}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: 150,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require('./../asset/image/doctor.webp')}
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
            <Pressable
              style={{flex: 1}}
              onPress={() => {
                setselectedtime('');
                setselecteddate(i);
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  backgroundColor: selecteddate == i ? Color.primary : 'white',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  {weekdayname[i.day]}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  {i.date}
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
                  {monthname[i.month]}
                </Text>
              </View>
            </Pressable>
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
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.primary,
            marginHorizontal: 80,
          }}
          onPress={bookapointmenthandler}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
              padding: 5,
            }}>
            Book Apointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// sql = `SELECT *,c.id as clinic_doctor_id FROM clinic_doctor_mapping c INNER JOIN clinics cl ON cl.id = c.clinic_id WHERE c.doctor_id = '${doctor_id}'`;
