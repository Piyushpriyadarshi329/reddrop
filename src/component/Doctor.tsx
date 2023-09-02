import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {commonStyles} from '../asset/styles';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {DoctorDto} from '../types';
import ShadowWrapper from './ShadowWrapper';
import {AppPages} from '../appPages';

export default function Doctor({details}: {details: DoctorDto}) {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: details,
        }),
      );
      navigation.navigate(AppPages.BookApointment, {id: details.id});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ShadowWrapper>
      <TouchableOpacity
        onPress={clickhandler}
        style={[
          {
            padding: 10,
            width: 130,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
          },
        ]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={commonStyles.profileImage}
            source={
              details.profile_image
                ? {
                    uri: details.profile_image,
                  }
                : require('./../asset/image/doctor.png')
            }
          />
        </View>
        <View style={{paddingTop: 5, flex: 1}}>
          <Text style={commonStyles.font18} numberOfLines={1}>
            Dr. {details.name}
          </Text>
          <Text style={commonStyles.font12}>{details.speciality}</Text>
          {!!details.no_of_bookings ? (
            <Text style={commonStyles.font12}>
              Bookings {details.no_of_bookings}
            </Text>
          ) : (
            <Text style={commonStyles.font12}></Text>
          )}
        </View>
      </TouchableOpacity>
    </ShadowWrapper>
  );
}
