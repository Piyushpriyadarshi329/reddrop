import React, {useState} from 'react';
import {IModalMethods} from '../../../utils/useModalMethods';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import Color from '../../../asset/Color';
import {Gender, UserCard} from './UserCard';
import {BookingOverview} from './BookingOverview';
import {commonStyles} from '../../../asset/styles';
import {useNavigation} from '@react-navigation/native';
import {BookingUserInterface, UserForm} from './UserForm';
import {
  Appointmentdto,
  BookSlotRequest,
  ClinicWithAddressAndImage,
  Slot,
} from '../../../types';
import {successAlert} from '../../../utils/useShowAlert';
import {useBookslot as useBookSlot} from '../../../customhook/useBookslot';
import {getToday} from '../../../utils/dateMethods';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import uuid from 'react-native-uuid';

export const BookingConfirmation = ({
  modalMethods,
  selectedTime,
  existingAppointment,
  selectedClinic,
  onBookingSuccess,
}: {
  modalMethods: IModalMethods;
  selectedTime: (Slot & {id: string}) | undefined;
  existingAppointment: Appointmentdto;
  onBookingSuccess: any;
  selectedClinic: ClinicWithAddressAndImage | undefined;
}) => {
  const [user, setUser] = useState<BookingUserInterface | undefined>({
    dob: new Date('1995-12-17T03:24:00'),
    gender: Gender.MALE,
    name: 'Punyashlok',
  });
  const AppState = useSelector((state: RootState) => state.Appstate);

  const [showUserForm, setShowUserForm] = useState(false);

  const {mutate: bookSlot} = useBookSlot({
    onSuccess: () => {
      successAlert('Booked Successfully');
      onBookingSuccess();
    },
  });

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
        dob: user?.dob.getTime(),
        gender: user?.gender,
        name: user?.name,
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

  return (
    <Modal
      visible={modalMethods.isOpen}
      onRequestClose={modalMethods.close}
      transparent={true}
      animationType="slide"
      statusBarTranslucent>
      <ModalCloseOnEscape setVisible={modalMethods.close} />
      <View
        style={{
          flex: 1,
          marginVertical: 100,
          marginHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          gap: 10,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={commonStyles.flexRowAlignCenter}
            onPress={modalMethods.close}>
            <Icon name="arrow-left" color={Color.primary} />
            <Text style={{color: Color.primary}}>Edit</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>Confirm Booking</Text>
        </View>
        <BookingOverview />
        {showUserForm || !user ? (
          <UserForm
            onSubmit={user => {
              setUser(user);
              setShowUserForm(false);
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setUser(undefined);
              setShowUserForm(true);
            }}>
            <UserCard user={user} />
          </TouchableOpacity>
        )}
        <Button
          onPress={bookAppointmentHandler}
          title={'Book'}
          color={Color.primary}
          disabled={!user}
        />
      </View>
    </Modal>
  );
};
