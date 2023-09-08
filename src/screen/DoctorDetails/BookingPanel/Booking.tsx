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
import {BookingConfirmation} from './BookingConfirmation';
import {useModalMethods} from '../../../utils/useModalMethods';
import moment from 'moment';
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

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<DateObj | undefined>(
    undefined,
  );
  const bookingModal = useModalMethods();
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
      date: selectedDate?.senddate.getTime() ?? 0,
    });

  const timeSlots = useMemo(
    () =>
      bookingAvailability
        ?.filter(
          i =>
            getToday().getTime() != selectedDate?.senddate.getTime() ||
            i.totime >= moment().format('HHmm'),
        )
        ?.map(i => {
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
        }),
    [bookingAvailability, selectedDate],
  );

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
                  marginTop: 40,
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
            <Btn
              title="Book Appointment"
              onPress={() => {
                bookingModal.open();
              }}
            />
          </View>
        </View>
      )}
      <BookingConfirmation
        modalMethods={bookingModal}
        selectedTime={selectedTime}
        existingAppointment={existingAppointment}
        onBookingSuccess={onBookingSuccess}
        selectedClinic={selectedClinic}
      />
    </View>
  );
};

export default Booking;
