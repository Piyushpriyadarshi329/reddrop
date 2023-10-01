import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState, useRef} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  BackHandler,
  StyleSheet,
} from 'react-native';
import openMap from 'react-native-open-maps';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuContext,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppPages} from '../../appPages';
import {commonStyles} from '../../asset/styles';
import {ConfirmationModal} from '../../component/ConfirmationModal';
import {
  Appointmentdto,
  AppointmentWithLatestStatus,
  BookingStatus,
} from '../../types';
import {getTimeStringFromDBTime} from '../../utils/dateMethods';
import {useGetDoctor} from '../DoctorDetails/useDoctorQuery';
import {errorAlert, useAlert} from '../../utils/useShowAlert';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import Color, {Pallet3} from '../../asset/Color';

export default function AppointmentCard({
  appointment,
  showMenuOptions,
}: {
  appointment: AppointmentWithLatestStatus;
  showMenuOptions?: boolean;
}) {
  const navigation = useNavigation<NavigationProp<any>>();
  const isFocused = useIsFocused();
  const {data: doctorDetails} = useGetDoctor(appointment.doctor_id ?? '');
  const {data: clinicDetails} = useGetcliniclist({
    clinic_id: appointment.clinic_id ?? '',
    doctor_id: appointment.doctor_id,
  });

  console.log('clinicDetails card', clinicDetails);

  const {successAlert} = useAlert();
  const [deleteModal, setDeleteModal] = useState(false);
  const [rescheduleModal, setReScheduleModal] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const popupRef = useRef(null);
  const {mutate: updateSlotStatus} = useUpdateSlotStatus(() => {
    successAlert('Updated Booking.');
    setDeleteModal(false);
  });

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        gap: 5,
      }}>
      <View style={{flexDirection: 'row', flex: 1.6}}>
        <View style={{flex: 1}}>
          <Image
            style={{
              width: 65,
              height: 65,
              borderRadius: 100,
              marginTop: 10,
              marginLeft: 10,
            }}
            source={
              doctorDetails?.profile_image
                ? {
                    uri: doctorDetails?.profile_image,
                  }
                : require('../../asset/image/doctor.png')
            }
          />
        </View>
        <View style={{flex: 2, marginTop: 10}}>
          <Text style={commonStyles.caption}>
            {appointment.doctorSpeciality}
          </Text>
          <Text style={[commonStyles.font18, commonStyles.weight700]}>
            Dr. {appointment.doctorsName}
          </Text>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            {appointment.clinic_name}
          </Text>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            {appointment?.mobile}
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          {isFocused && showMenuOptions ? (
            <Menu>
              <MenuTrigger
                onPress={() => {
                  setPopupOpen(true);
                }}
                style={{padding: 10}}>
                <Icon name="dots-three-horizontal" size={16} color={'black'} />
              </MenuTrigger>

              <MenuOptions>
                <MenuOption
                  style={{padding: 5}}
                  onSelect={() => {
                    setPopupOpen(false);
                    setDeleteModal(true);
                  }}>
                  <Text style={{color: 'black', padding: 5}}>Cancel</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    setPopupOpen(false);

                    setReScheduleModal(true);
                  }}>
                  <Text style={{color: 'black', padding: 5}}>Re-Schedule</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ) : null}
        </View>
      </View>

      <View style={appointmentStyles.tagLine}>
        <View>
          <Text style={commonStyles.font14}>
            {new Date(Number(appointment.appointment_date)).toDateString()}
          </Text>

          <View
            style={[commonStyles.flexRowAlignCenter, {alignSelf: 'flex-end'}]}>
            <Text style={commonStyles.font14}>
              {getTimeStringFromDBTime(appointment.from_working_time)}
              &nbsp;-&nbsp;
              {getTimeStringFromDBTime(appointment.to_working_time)}
            </Text>
          </View>
        </View>
        <View>
          <View
            style={[commonStyles.flexRowAlignCenter, {alignSelf: 'flex-end'}]}>
            <Text style={commonStyles.font14}>Slot: &nbsp;</Text>
            <Text style={commonStyles.font18}>{appointment.slot_index}</Text>
          </View>
          <View
            style={[commonStyles.flexRowAlignCenter, {alignSelf: 'flex-end'}]}>
            <Text style={commonStyles.font14}>Patient:&nbsp;</Text>
            <Text style={commonStyles.font16}>{appointment.name}</Text>
          </View>
        </View>
      </View>

      {appointment?.latestBookingStatus && (
        <>
          {appointment?.latestBookingStatus?.started_slot && (
            <View style={appointmentStyles.onGoingSlotContainer}>
              <Text style={commonStyles.font16}>Ongoing Slot:&nbsp;</Text>
              <Text style={commonStyles.font24}>
                {appointment?.latestBookingStatus?.started_slot}
              </Text>
            </View>
          )}
          {appointment?.latestBookingStatus?.completed_slot ? (
            <View style={appointmentStyles.completedSlotContainer}>
              <Text style={commonStyles.font16}>Completed Slot:&nbsp;</Text>
              <Text style={commonStyles.font24}>
                {appointment?.latestBookingStatus?.completed_slot}
              </Text>
            </View>
          ) : null}
        </>
      )}

      <View style={{flexDirection: 'row', flex: 0.7}}>
        <View style={{flexDirection: 'column', flex: 1, marginHorizontal: 15}}>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            {appointment.address.address_line1}
          </Text>
          <Text style={commonStyles.font14}>
            {appointment.address.address_line2}
          </Text>
          <Text style={commonStyles.font14}>{appointment.address.city}</Text>
        </View>
        {appointment.address.lan && appointment.address.lat && (
          <TouchableOpacity
            style={{
              right: 0,
              position: 'absolute',
              top: 0,
              height: '100%',
            }}
            onPress={() =>
              openMap({
                latitude: appointment.address.lat,
                longitude: appointment.address.lan,
              })
            }>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                height: '100%',
              }}>
              <Ionicons name="navigate" size={20} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <ConfirmationModal
        onsubmit={() => {
          if (remarks) {
            updateSlotStatus({
              id: appointment.id,
              status: 'CANCELLED',
              remarks: remarks,
            });
          } else {
            errorAlert('Please provide Remarks');
          }
        }}
        setRemarks={setRemarks}
        modalVisible={deleteModal}
        setModalVisible={setDeleteModal}
        subtitle="Let us know the reason"
        // subtitle="Are you sure you want to cancel the booking"
        title="Cancel Booking ?"
      />
      <ConfirmationModal
        onsubmit={() => {
          navigation.navigate(AppPages.HomeStack, {
            screen: AppPages.BookApointment,
            params: {
              existing_appointment: appointment,
              id: doctorDetails?.id,
              clinicDetails: clinicDetails?.[0],
            },
          });
        }}
        modalVisible={rescheduleModal}
        setModalVisible={setReScheduleModal}
        subtitle="Are you sure you want to Reschedule the booking"
        title="Reschedule Booking ?"
        mode="primary"
      />
    </View>
  );
}

const appointmentStyles = StyleSheet.create({
  tagLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    backgroundColor: '#f5f9fa',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  onGoingSlotContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: Color.tertiary,
  },
  completedSlotContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#8eedcc',
  },
});
