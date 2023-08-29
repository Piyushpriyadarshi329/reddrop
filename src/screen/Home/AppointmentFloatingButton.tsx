import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {RootState} from '../../redux/Store';
import {useGetAppointments} from '../Appointment/useAppointmentQuery';
import {useGetDoctor} from '../DoctorDetails/useDoctorQuery';

const AppointmentFloatingButton = () => {
  const {username, userid} = useSelector((root: RootState) => root.Appstate);
  const {data: appointments} = useGetAppointments({
    customerId: userid,
  });
  const {data: doctorDetails} = useGetDoctor(appointments?.[0].doctor_id ?? '');
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        bottom: 0,
        padding: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        backgroundColor: Color.tertiary,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50}}
            source={
              doctorDetails?.profile_image
                ? {uri: doctorDetails?.profile_image}
                : require('../../asset/image/doctor.png')
            }
          />
          <View
            style={{
              paddingHorizontal: 10,
              width: '85%',
              alignItems: 'flex-end',
            }}>
            <Text style={commonStyles.font18}>
              You have an appointment scheduled with Dr.
              {appointments?.[0].doctorsName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentFloatingButton;
