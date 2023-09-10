import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState, useRef} from 'react';
import {Image, TouchableOpacity, View, BackHandler} from 'react-native';
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
import {Appointmentdto, BookingStatus} from '../../types';
import {getTimeStringFromDBTime} from '../../utils/dateMethods';
import {useGetDoctor} from '../DoctorDetails/useDoctorQuery';
import {useAlert} from '../../utils/useShowAlert';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';

export default function AppointmentCard({
  appointment,
  showMenuOptions,
}: {
  appointment: Appointmentdto;
  showMenuOptions?: boolean;
}) {
  const navigation = useNavigation<NavigationProp<any>>();
  const isFocused = useIsFocused();
  const {data: doctorDetails} = useGetDoctor(appointment.doctor_id ?? '');

  const {successAlert} = useAlert();
  const [deleteModal, setDeleteModal] = useState(false);
  const [rescheduleModal, setReScheduleModal] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
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
                  <Text style={{color: 'black', padding: 5}}>Reschduled</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ) : null}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          backgroundColor: '#f5f9fa',
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={commonStyles.font18}>
          {new Date(Number(appointment.appointment_date)).toDateString()}
        </Text>
        <Text style={commonStyles.font18}>
          {getTimeStringFromDBTime(appointment.from_working_time)}
        </Text>
        <View
          style={[commonStyles.flexRowAlignCenter, {alignSelf: 'flex-end'}]}>
          <Text style={commonStyles.font16}>Slot:</Text>
          <Text style={commonStyles.font24}>{appointment.slot_index}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.7, marginTop: 10}}>
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
          updateSlotStatus({
            id: appointment.id,
            status: 'CANCELLED',
          });
        }}
        modalVisible={deleteModal}
        setModalVisible={setDeleteModal}
        subtitle="Are you sure you want to cancel the booking"
        title="Cancel Booking ?"
      />
      <ConfirmationModal
        onsubmit={() => {
          navigation.navigate(AppPages.BookApointment, {
            existing_appointment: appointment,
            id: doctorDetails?.id,
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
