import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ClinicDto, ClinicWithAddressAndImage} from '../types';
import {commonStyles} from '../asset/styles';
import Address from './Address';

export default function Clinic({
  details,
}: {
  details: ClinicWithAddressAndImage;
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{padding: 10}}
      onPress={() => {
        navigation.navigate('Doctorlist', {data: details});
      }}>
      <Image
        style={commonStyles.profileImage}
        source={
          details.profile_image
            ? {
                uri: details.profile_image,
              }
            : require('./../asset/image/Clinic.jpeg')
        }
      />
      <View style={{paddingTop: 5}}>
        <Text style={commonStyles.font18}>{details.name}</Text>
        <Address details={details.address} compact />
      </View>
    </TouchableOpacity>
  );
}
