import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {commonStyles} from '../asset/styles';
import {DoctorDto} from '../types';

export default function Doctor({details}: {details: DoctorDto}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: details,
        }),
      );
      navigation.navigate('BookApointment', {id: details.id});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableOpacity
      onPress={clickhandler}
      style={{
        padding: 10,
        width: 130,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={commonStyles.profileImage}
          source={
            details.profile_image
              ? {
                  uri: details.profile_image,
                }
              : require('./../asset/image/doctor.webp')
          }
        />
      </View>
      <View style={{paddingTop: 5, flex: 1}}>
        <Text style={commonStyles.font18}>Dr. {details.name}</Text>
        <Text style={commonStyles.font12}>{details.speciality}</Text>
        {!!details.no_of_bookings && (
          <Text style={commonStyles.font12}>
            Bookings {details.no_of_bookings}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
