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
  SectionList,
  StyleSheet,
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
import {BookSlotRequest} from '../../types';
import {useGetBookingAvailability} from '../../customhook/useGetBookingAvailability';

interface TimeSlot {
  time: any;
  id: string;
  booked: boolean;
  index: number;
  status: string;
}
interface DayItem {}
export default function BookApointment() {
  const navigation = useNavigation();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [selecteddate, setselecteddate] = useState<any>(null);
  const [selectedtime, setselectedtime] = useState<any>('');
  const [datelist, setdatelist] = useState<any>([]);
  const [timeslot, settimeslot] = useState<TimeSlot[]>([]);

  const [selectedclinic, setselectedclinic] = useState<any>('');

  const {data: getOccupiedSlotsres} = usegetOccupiedSlots({
    dateString: selecteddate?.senddate,
    doctor_clinic_id: selectedclinic.clinic_doctor_id,
  });

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

  useEffect(() => {
    if (selecteddate) {
      // createslot();

      getbookingavailability();
    }
  }, [selecteddate, selectedclinic]);

  useEffect(() => {
    console.log('selectedtime', selectedtime);
  }, [selectedtime]);

  async function getbookingavailability() {
    try {
      console.log('selecteddate', selecteddate);
      let payload = {
        doctor_id: customerdata.doctor.id,
        clinic_id: selectedclinic.clinic_id,
        date: new Date(selecteddate.senddate + 'T00:00:00Z').getTime(),
      };

      console.log('payload==', payload);

      let getbookingavailabilityres: any = await useGetBookingAvailability(
        payload,
      );

      // console.log('getbookingavailabilityres', getbookingavailabilityres.data);

      let localtimeslot: any = [];

      getbookingavailabilityres.data.map(i => {
        console.log("{...i, title: 'hello', data: i.slots}", {
          ...i,
          title: 'hello',
          data: i.slots,
        });
        localtimeslot.push({
          ...i,
          title:
            showtimefromstring(i.fromtime) +
            ' To ' +
            showtimefromstring(i.totime),
          data: i.slots.map(j => {
            return {...j, id: i.workingtime_id};
          }),
        });
      });

      // console.log('localtimeslot', localtimeslot);

      settimeslot([...localtimeslot]);
    } catch (error) {
      console.log(error);
    }
  }

  // async function createslot() {
  //   try {
  //     let clinicDayAvailabilities = availabilitylist?.filter(
  //       i =>
  //         i.week_day == selecteddate.day &&
  //         i.clinic_id == selectedclinic.clinic_id,
  //     );

  //     if (!!clinicDayAvailabilities?.length) {
  //       var localtimeslot: TimeSlot[] = [];

  //       clinicDayAvailabilities?.map(clinicDayAvailability => {
  //         let filterbookedslot = getOccupiedSlotsres?.filter(
  //           k => k.work_time_id == clinicDayAvailability.id,
  //         );

  //         let t1 = clinicDayAvailability.from_time;
  //         let t2 = clinicDayAvailability.to_time;
  //         let slot = clinicDayAvailability.no_of_slot;

  //         let slotwiseTimes = getSlotwisetime(t1, t2, slot);

  //         slotwiseTimes.map((slotTime, index) => {
  //           localtimeslot.push({
  //             time: slotTime,
  //             id: clinicDayAvailability.id,
  //             booked:
  //               !!filterbookedslot?.length &&
  //               filterbookedslot[0].occupiedSlots.includes(index),
  //           });
  //         });
  //       });

  //       // settimeslot([...localtimeslot]);
  //     } else {
  //       settimeslot([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const {data: availabilitylist} = useGetavailability({
  //   doctor_id: customerdata.doctor.id,
  // });

  async function bookapointmenthandler() {
    try {
      const Appointment_date = new Date(
        `${selecteddate.senddate}T00:00:00Z`,
      ).getTime();

      let bookslotpayload: BookSlotRequest = {
        customer_id: Appstate.userid,
        doctor_clinic_id: selectedclinic.clinic_doctor_id,
        slot_index: selectedtime.index,
        workingtime_id: selectedtime.id,
        group_id: uuid.v4().toString(),
        payment_order_id: uuid.v4().toString(),
        appointment_date: Appointment_date,
      };

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
        {cliniclist?.map((i: any) => {
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
          <>
            <SectionList
              sections={timeslot}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => {
                // console.log('item', item);
                return (
                  <>
                    {item?.status == 'BOOKED' ? (
                      <TouchableOpacity
                        key={JSON.stringify(item?.time)}
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          marginTop: 10,
                          marginHorizontal: 5,
                          borderRadius: 5,

                          // backgroundColor:
                          //   selectedtime.item == item.item ? Color.primary : 'white',
                          backgroundColor: 'lightgray',
                        }}
                        onPress={() => {
                          if (item?.status == 'BOOKED') {
                            alert('Already booked');
                          } else if (item?.status == 'NA') {
                            // setselectedtime(item);
                            alert('Not availabile');
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
                            Slot- {item.index}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={JSON.stringify(item?.time)}
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          marginTop: 10,
                          marginHorizontal: 5,
                          borderRadius: 5,

                          backgroundColor:
                            selectedtime.id == item.id &&
                            selectedtime.index == item.index
                              ? Color.primary
                              : 'white',
                        }}
                        onPress={() => {
                          console.log('item', item);
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
                            Slot- {item.index}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                );
              }}
              renderSectionHeader={({section: {title}}) => (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 10,
                    color: 'black',
                  }}>
                  {title}
                </Text>
              )}
            />
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              No Slot is available
            </Text>
          </View>
        )}
      </View>
      <View style={{flex: 1, marginTop: 10}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

// {timeslot.map((i: any) => {
//   return (
//     <FlatList
//       data={i.slots}
//       keyExtractor={item => JSON.stringify(item)}
//       renderItem={item => {
//         console.log('item==>', item.item);
//         return (
//           <>
//             {item.item?.status == 'BOOKED' ? (
//               <TouchableOpacity
//                 key={JSON.stringify(item.item?.time)}
//                 style={{
//                   flex: 1,
//                   borderWidth: 1,
//                   marginTop: 10,
//                   marginHorizontal: 5,
//                   borderRadius: 5,

//                   // backgroundColor:
//                   //   selectedtime.item == item.item ? Color.primary : 'white',
//                   backgroundColor: 'lightgray',
//                 }}
//                 onPress={() => {
//                   if (item.item?.status == 'BOOKED') {
//                     alert('Already booked');
//                   } else if (item.item?.status == 'NA') {
//                     // setselectedtime(item);
//                     alert('Not availabile');
//                   }
//                 }}>
//                 <View style={{flex: 1}}>
//                   <Text
//                     style={{
//                       textAlign: 'center',
//                       color: 'white',
//                       fontSize: 16,
//                       padding: 5,
//                     }}>
//                     Slot- {item.item.index}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 key={JSON.stringify(item.item?.time)}
//                 style={{
//                   flex: 1,
//                   borderWidth: 1,
//                   marginTop: 10,
//                   marginHorizontal: 5,
//                   borderRadius: 5,

//                   backgroundColor:
//                     selectedtime.item == item.item
//                       ? Color.primary
//                       : 'white',
//                 }}
//                 onPress={() => {
//                   setselectedtime(item);
//                 }}>
//                 <View style={{flex: 1}}>
//                   <Text
//                     style={{
//                       textAlign: 'center',
//                       color: 'black',
//                       fontSize: 16,
//                       padding: 5,
//                     }}>
//                     Slot- {item.item.index}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           </>
//         );
//       }}
//       numColumns={4}
//     />
//   );
// })}
