import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ClinicDto, ClinicWithAddressAndImage, SpecialityDto} from '../types';
import {commonStyles} from '../asset/styles';
import Address from './Address';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';

export default function Speciality({details}: {details: SpecialityDto}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        padding: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
      onPress={() => {
        navigation.navigate('DoctorlistSpecialitywise', {data: details});
      }}>
      <View style={{flex: 1}}>
        <Image
          style={styles.image}
          source={
            details.speciality_image
              ? {
                  uri: details.speciality_image,
                }
              : require('./../asset/image/Clinic.jpeg')
          }
        />
      </View>
      <View style={{paddingTop: 5, flex: 1}}>
        <Text style={commonStyles.font16}>{details.name}</Text>
        <View style={{width: '100%'}}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
  },
});
