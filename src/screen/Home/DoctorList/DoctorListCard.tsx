import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {DoctorDto} from '../../../types';
import {updatecustomerdata} from '../../../redux/reducer/Customerreducer';
import {AppPages} from '../../../appPages';
import {commonStyles} from '../../../asset/styles';

const DoctorListCard = ({details}: {details: DoctorDto}) => {
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
    <TouchableOpacity
      onPress={clickhandler}
      style={[
        {
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
        },
      ]}>
      <View style={{paddingHorizontal: 10}}>
        <Image
          style={commonStyles.profileImage}
          source={
            details.profile_image
              ? {
                  uri: details.profile_image,
                }
              : require('../../../asset/image/doctor.png')
          }
        />
      </View>
      <View style={{flex: 6}}>
        <Text style={commonStyles.font18}>Dr. {details.name}</Text>
        {details.speciality && (
          <Text style={commonStyles.caption}>{details.speciality}</Text>
        )}
        {!!details.no_of_bookings && (
          <Text style={commonStyles.font12}>
            Bookings {details.no_of_bookings}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DoctorListCard;
