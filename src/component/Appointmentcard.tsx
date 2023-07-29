import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {Appointmentdto} from '../types';

export default function Appointmentcard({
  appointment,
}: {
  appointment: Appointmentdto;
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: appointment,
        }),
      );
      navigation.navigate('BookApointment');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        height: 150,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: Color.primary,
        borderRadius: 10,
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
            source={require('./../asset/image/doctor.webp')}
          />
        </View>
        <View style={{flex: 2, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            Dr. {appointment.doctorsName}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>
            {appointment.doctorSpeciality}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.6, marginTop: 5}}>
        <Text style={{flex: 1, marginLeft: 20, fontSize: 14}}>30 JUL 2023</Text>
        <Text style={{flex: 1, marginLeft: 20}}>
          Slot - {appointment.slot_index + 1}
        </Text>
      </View>

      <View style={{flexDirection: 'row', flex: 0.7, marginTop: -5}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={{flex: 1, marginLeft: 20}}>Ring Road</Text>
          <Text style={{flex: 1, marginLeft: 20}}>Warje,pune</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>Status:{appointment.status}</Text>
        </View>
      </View>
    </View>
  );
}
