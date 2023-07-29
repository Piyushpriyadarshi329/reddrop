import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import Color from '../asset/Color';

export default function Appointmentcard({data}: any) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log('data', data);

  async function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: data,
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
            Dr. Doctor
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>Dental Specialist</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.6, marginTop: 5}}>
        <Text style={{flex: 1, marginLeft: 20, fontSize: 14}}>30 JUL 2023</Text>
        <Text style={{flex: 1, marginLeft: 20}}>Slot -5</Text>
      </View>

      <View style={{flexDirection: 'column', flex: 0.7, marginTop: -5}}>
        <Text style={{flex: 1, marginLeft: 20}}>Ring Road</Text>
        <Text style={{flex: 1, marginLeft: 20}}>Warje,pune</Text>
      </View>
    </View>
  );
}
