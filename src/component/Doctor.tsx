import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';

export default function Doctor({data}: any) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    <View style={{flex: 1, height: 140, width: 120, marginLeft: 5}}>
      <TouchableOpacity style={{flex: 1}} onPress={clickhandler}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={require('./../asset/image/doctor.webp')}
        />

        <Text style={{color: 'black'}}>Dr. {data.name}</Text>
        <Text style={{color: 'black', fontSize: 12}}>Dental Specialist</Text>
        <View style={{flexDirection: 'row', marginTop: 2}}>
          <Text
            style={{
              color: 'black',
              fontSize: 10,
              fontWeight: '400',
              marginTop: 5,
              textAlign: 'right',
              marginLeft: 40,
            }}>
            Bookings 320
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
