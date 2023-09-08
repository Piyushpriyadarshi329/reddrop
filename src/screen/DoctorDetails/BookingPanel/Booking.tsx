import React, {useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, Image, ScrollView, Text, View} from 'react-native';
import uuid from 'react-native-uuid';
import {useSelector} from 'react-redux';
import {showTimeFromString} from '../../../Appfunction';
import Btn from '../../../component/Btn';
import {useBookslot as useBookSlot} from '../../../customhook/useBookslot';
import {useGetcliniclist as useGetClinicsList} from '../../../customhook/useGetcliniclist';
import type {RootState} from '../../../redux/Store';
import {
  Appointmentdto,
  BookSlotRequest,
  ClinicWithAddressAndImage,
  Slot,
} from '../../../types';
import {DateCard} from '../DateCard';
import SlotCard from '../SlotCard';
import {DateObj, useDateList} from '../helper';
import {useGetBookingAvailability} from '../useGetBookingAvailability';
import ClinicButton from './ClinicButton';
import {successAlert} from '../../../utils/useShowAlert';
import {getToday} from '../../../utils/dateMethods';
export interface BookingProps {
  doctorId: string;
  existingAppointment: Appointmentdto;
  onBookingSuccess: any;
}
const Booking = ({
  doctorId,
  existingAppointment,
  onBookingSuccess,
}: BookingProps) => {
  const dateList = useDateList();

  const [updateDateList, setupdateDateList] = useState([]);

  useEffect(() => {
    updateDateListFun();
  }, []);

  async function updateDateListFun() {
    try {
      let localDateList: any = [];

      dateList.map(async i => {
        const {data: bookingAvailability, isLoading: isSlotsLoading} =
          await useGetBookingAvailability({
            doctor_id: doctorId,
            clinic_id: selectedClinic?.id ?? '',
            date: new Date(i?.senddate + 'T00:00:00Z').getTime(),
          });

        console.log('bookingAvailability', bookingAvailability);

        if (bookingAvailability.length > 0) {
          localDateList.push(i);
        }
      });

      console.log('localDateList', localDateList);
      setupdateDateList(localDateList);
    } catch (error) {
      console.log(error);
    }
  }

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<DateObj | undefined>(
    undefined,
  );
  const [selectedTime, setSelectedTime] = useState<
    (Slot & {id: string}) | undefined
  >(undefined);

  let {data: clinicsList} = useGetClinicsList({doctor_id: doctorId}, data => {
    setSelectedClinic(data?.[0]);
  });
  const {mutate: bookSlot} = useBookSlot({
    onSuccess: () => {
      successAlert('Booked Successfully');
      onBookingSuccess();
    },
  });

  const {data: bookingAvailability, isLoading: isSlotsLoading} =
    useGetBookingAvailability({
      doctor_id: doctorId,
      clinic_id: selectedClinic?.id ?? '',
      date: getToday().getTime(),
    });

  const timeSlots = useMemo(
    () =>
      bookingAvailability?.map(i => {
        if (
          getToday().getTime() ==
          new Date(
            new Date().toISOString().split('T')[0] + 'T00:00:00Z',
          ).getTime()
        ) {
          console.log('totime', i.totime);

          let cur_time =
            ('0' + new Date().getHours()).slice(-2) +
            ('0' + new Date().getMinutes()).slice(-2);

          console.log('cur_time', Number(cur_time), Number(i.totime));

          if (Number(i.totime) >= Number(cur_time)) {
            return {
              ...i,
              title:
                showTimeFromString(i.fromtime) +
                ' To ' +
                showTimeFromString(i.totime),
              data: i.slots.map(j => {
                return {...j, id: i.workingtime_id};
              }),
            };
          } else {
            return {
              ...i,
              title: 'No Slots available',
              data: [],
            };
          }
        } else {
          return {
            ...i,
            title:
              showTimeFromString(i.fromtime) +
              ' To ' +
              showTimeFromString(i.totime),
            data: i.slots.map(j => {
              return {...j, id: i.workingtime_id};
            }),
          };
        }
      }),
    [bookingAvailability],
  );
  const AppState = useSelector((state: RootState) => state.Appstate);

  async function bookAppointmentHandler() {
    try {
      const Appointment_date = getToday().getTime();

      let bookSlotPayload: BookSlotRequest = {
        customer_id: AppState.userid,
        doctor_clinic_id: selectedClinic?.clinic_doctor_id ?? '',
        slot_index: selectedTime?.index ?? 0,
        workingtime_id: selectedTime?.id ?? '',
        group_id: uuid.v4().toString(),
        payment_order_id: uuid.v4().toString(),
        appointment_date: Appointment_date,
      };
      if (existingAppointment) {
        bookSlotPayload.existing_booking_id = existingAppointment.id;
        bookSlotPayload.group_id = existingAppointment.group_id;
      }

      console.log('bookSlotPayload', bookSlotPayload);

      bookSlot(bookSlotPayload);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    dateList && dateList.length && setSelectedDate(dateList[0]);
  }, [dateList]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView style={{height: '100%'}}>
        <View style={{flexDirection: 'row', height: 60}}>
          {clinicsList?.map(clinic => (
            <ClinicButton
              clinic={clinic}
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
            />
          ))}
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            horizontal
            data={dateList}
            renderItem={({item: i}) => (
              <DateCard
                key={`${i.date}_${i.day}_${i.month}`}
                {...{
                  setselectedtime: setSelectedTime,
                  setselecteddate: setSelectedDate,
                  selecteddate: selectedDate,
                  i,
                }}
              />
            )}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          {isSlotsLoading && (
            <View
              style={{
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Image
                source={require('../../../asset/image/Carebook_loader.gif')}
                style={{width: 100, height: 100}}
              />
            </View>
          )}
          {!isSlotsLoading &&
            (!!timeSlots?.length ? (
              <>
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
                              selectedTime?.id == slot.id &&
                              selectedTime?.index == slot.index
                            }
                            onPress={slot => {
                              setSelectedTime(slot);
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  No Slots available
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      {selectedTime && (
        <View
          style={{
            marginTop: 10,
            width: '100%',
          }}>
          <View>
            <Btn title="Book Appointment" onPress={bookAppointmentHandler} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Booking;
