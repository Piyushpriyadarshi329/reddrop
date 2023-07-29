import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {slotwisetime} from '../../Appfunction';
import Color from '../../asset/Color';
import Navbar from '../../component/Navbar';
import {useBookslot} from '../../customhook/useBookslot';
import {useGetavailability} from '../../customhook/useGetavailability';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import type {RootState} from '../../redux/Store';
import {DateCard} from './DateCard';
import LottieView from 'lottie-react-native';

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

  const animationRef = useRef<LottieView>(null);

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
  const onBookingSuccess = () => {
    Alert.alert('Booked Successfully.', '', [
      {text: 'Ok', onPress: () => navigation.goBack()},
    ]);
  };
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
            Diagnostic radiology
          </Text>
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
          Becoming a doctor is an enormous commitment because it takes years of
          dedicated studying and clinical preparation before you can practise as
          a doctor.
        </Text>
      </View>

      <View style={{flex: 1}}>
        {cliniclist.map((i: any) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setdoctor_clinic_id(i.clinic_doctor_id);
              }}>
              <Text style={{color: 'black'}}>{i.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{flex: 1.4, flexDirection: 'row', marginHorizontal: 20}}>
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
