import {Button} from '@rneui/themed';
import moment from 'moment';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, ScrollView, Text, View} from 'react-native';
import {useGetAvailableDates} from '../../../customhook/useGetAvailableDates';
import {Appointmentdto, ClinicWithAddressAndImage, Slot} from '../../../types';
import {getTimeStringFromDBTime, getToday} from '../../../utils/dateMethods';
import {useModalMethods} from '../../../utils/useModalMethods';
import {DateCard} from '../DateCard';
import SlotCard from '../SlotCard';
import {useGetBookingAvailability} from '../useGetBookingAvailability';
import {BookingConfirmation} from './BookingConfirmation';
export interface BookingProps {
  doctorId: string;
  existingAppointment: Appointmentdto;
  onBookingSuccess: any;
  clinicDetails: ClinicWithAddressAndImage;
}
const Booking = ({
  doctorId,
  existingAppointment,
  onBookingSuccess,
  clinicDetails,
}: BookingProps) => {
  const [selectedDate, setSelectedDate] = useState<number | undefined>(
    undefined,
  );
  const bookingModal = useModalMethods();
  const [selectedTime, setSelectedTime] = useState<
    (Slot & {id: string}) | undefined
  >(undefined);

  const {data: dateList} = useGetAvailableDates({
    date: getToday().getTime(),
    doctor_id: doctorId,
    clinic_id: clinicDetails?.id || '',
    // clinic_id: '244e7e5f-761b-4063-83cf-0314bb623f2c',
  });

  const {data: bookingAvailability, isLoading: isSlotsLoading} =
    useGetBookingAvailability({
      doctor_id: doctorId,
      clinic_id: clinicDetails?.id ?? '',
      date: selectedDate ?? 0,
    });

  const timeSlots = useMemo(
    () =>
      bookingAvailability
        ?.filter(
          i =>
            getToday().getTime() != selectedDate ||
            i.totime <= i.fromtime ||
            // to time <= from time meaning the working_time extends till next day.
            i.totime >= moment().format('HHmm'),
        )
        ?.map(i => {
          return {
            ...i,
            title:
              getTimeStringFromDBTime(i.fromtime) +
              ' To ' +
              getTimeStringFromDBTime(i.totime),
            data: i.slots.map(j => {
              return {...j, id: i.workingtime_id};
            }),
          };
        }),
    [bookingAvailability, selectedDate],
  );

  useEffect(() => {
    dateList && dateList.length && setSelectedDate(dateList[0]?.date);
  }, [dateList]);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView style={{height: '100%'}}>
        {/* <View style={{flexDirection: 'row', height: 60}}>
          {clinicsList?.map(clinic => (
            <ClinicButton
              clinic={clinic}
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
            />
          ))}
        </View> */}
        <View style={{marginTop: 10}}>
          <FlatList
            horizontal
            data={dateList}
            renderItem={({item: i}) => (
              <DateCard
                key={`${i.date}`}
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
            <Button
              title="Book Appointment"
              onPress={() => {
                bookingModal.open();
              }}
            />
          </View>
        </View>
      )}
      {bookingModal.isOpen && (
        <BookingConfirmation
          modalMethods={bookingModal}
          selectedTime={selectedTime}
          selectedDate={selectedDate}
          existingAppointment={existingAppointment}
          onBookingSuccess={onBookingSuccess}
          selectedClinic={clinicDetails}
        />
      )}
    </View>
  );
};

export default Booking;
