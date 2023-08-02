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
// import Icon from 'react-native-vector-icons/dist/Entypo';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Color from '../asset/Color';
import {useGetavailability} from '../customhook/useGetavailability';
import type {RootState} from './../redux/Store';
import {showtimefromstring, slotwisetime} from '../Appfunction';
import {useBookslot} from '../customhook/useBookslot';
import uuid from 'react-native-uuid';
import {useGetcliniclist} from '../customhook/useGetcliniclist';

export default function BookApointment() {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<any>(null);
  const [selectedtime, setselectedtime] = useState<any>('');
  const [datelist, setdatelist] = useState<any>([]);
  const [availabilitylist, setavailabilitylist] = useState([]);
  const [timeslot, settimeslot] = useState([]);
  const [cliniclist, setcliniclist] = useState<any>([]);

  const [doctor_clinic_id, setdoctor_clinic_id] = useState('');

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
      console.log('selecteddate', selecteddate);

      let filterdata: any = availabilitylist.filter(
        (i: any) => i.week_day == selecteddate.day,
      );

      console.log('filterdata', filterdata);

      // {"clinic_id": "566fbaf6-7c2c-4cf6-9fc4-e0d038abcce3", "doctor_id": "ca0ca687-51f6-45f0-bf1d-c195e5df8d87", "entry_id": "aa", "from_time": "093000", "id": "f1247e5f-8abf-4a45-9c35-d4c9f8ca0686", "no_of_slot": 5, "to_time": "120000", "week": null, "week_day": 1}

      if (filterdata.length > 0) {
        var localtimeslot: any = [];

        filterdata.map((i, index) => {
          let t1 = filterdata[index].from_time;
          let t2 = filterdata[index].to_time;
          let slot = filterdata[index].no_of_slot;

          let newdata: any = slotwisetime(t1, t2, slot);

          // console.log('newdata', newdata);

          newdata.map((j: any) => {
            let obj: any = {};

            obj.time = j;
            obj.id = filterdata[index].id;

            localtimeslot.push(obj);
          });
        });

        console.log('localtimeslot', localtimeslot.length);

        settimeslot([...localtimeslot]);
      } else {
        settimeslot([]);
      }
    }
  }, [selecteddate]);

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
        setdoctor_clinic_id(res.data[0].clinic_doctor_id);
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
      } = {
        id: uuid.v4(),
        customer_id: Appstate.userid,
        doctor_clinic_id: doctor_clinic_id,
        slot_index: selectedtime.index,
        workingtime_id: selectedtime.item.id,
        created_datetime: new Date().getTime(),
        status: 'BOOKED',
        group_id: uuid.v4(),
        modified_datetime: new Date().getTime(),
        payment_order_id: uuid.v4(),
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
      <View style={{flex: 1, marginTop: 10}}>
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
            Diagnostic radiology
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
                  doctor_clinic_id == i.doctor_clinic_id
                    ? Color.primary
                    : Color.primary,
                justifyContent: 'center',
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setdoctor_clinic_id(i.clinic_doctor_id);
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
              return (
                <TouchableOpacity
                  key={JSON.stringify(item.item.time)}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    marginTop: 10,
                    marginHorizontal: 5,
                    borderRadius: 5,
                    backgroundColor:
                      selectedtime.item == item.item ? Color.primary : 'white',
                  }}
                  onPress={() => {
                    setselectedtime(item);
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
