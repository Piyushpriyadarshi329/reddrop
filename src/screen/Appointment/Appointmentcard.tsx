import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import openMap from 'react-native-open-maps';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {Appointmentdto} from '../../types';
import {getTimeStringFromDBTime} from '../../utils/dateMethods';
import {useGetDoctor} from '../DoctorDetails/useDoctorQuery';
import {AppPages} from '../../appPages';

export default function Appointmentcard({
  appointment,
  setModalVisible,
  setselectedbookingid,
}: {
  appointment: Appointmentdto;
  setModalVisible: any;
  setselectedbookingid: any;
}) {
  const navigation = useNavigation<any>();
  const {data: doctorDetails} = useGetDoctor(appointment.doctor_id ?? '');

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
          <Menu>
            <MenuTrigger>
              <Icon name="dots-three-horizontal" size={16} color={'black'} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption
                style={{padding: 5}}
                onSelect={() => {
                  setModalVisible(true);
                  setselectedbookingid(appointment.id);
                }}>
                <Text style={{color: 'black', padding: 5}}>Cancel</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  navigation.navigate(AppPages.BookApointment, {
                    existing_appointment: appointment,
                  });
                }}>
                <Text style={{color: 'black', padding: 5}}>Reschduled</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
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
    </View>
  );
}
