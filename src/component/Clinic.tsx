import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ClinicDto, ClinicWithAddressAndImage} from '../types';
import {commonStyles, profileImageStyles} from '../asset/styles';
import Address from './Address';
import {homeStyles} from '../screen/Home/Home';
import ShadowWrapper from './ShadowWrapper';

export default function Clinic({
  details,
}: {
  details: ClinicWithAddressAndImage;
}) {
  const navigation = useNavigation();
  return (
    <ShadowWrapper>
      <TouchableOpacity
        style={[
          {
            padding: 10,
            backgroundColor: 'white',
            width: 130,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
          },
        ]}
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
          <Text style={commonStyles.font18} numberOfLines={1}>
            {details.name}
          </Text>
        </View>
      </TouchableOpacity>
    </ShadowWrapper>
  );
}
