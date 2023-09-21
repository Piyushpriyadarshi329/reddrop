import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../asset/styles';
import {ClinicWithAddressAndImage} from '../types';
import ShadowWrapper from './ShadowWrapper';
import {AppPages} from '../appPages';

export default function Clinic({
  details,
}: {
  details: ClinicWithAddressAndImage;
}) {
  const navigation = useNavigation<any>();
  return (
    <ShadowWrapper>
      <TouchableOpacity
        style={[
          {
            backgroundColor: 'white',
            width: 130,
            height: 180,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
          },
        ]}
        onPress={() => {
          navigation.navigate(AppPages.Doctorlist, {data: details});
        }}>
        <View style={{padding: 10}}>
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
        </View>
        <View style={{paddingHorizontal: 5, paddingVertical: 5, width: '100%'}}>
          <Text style={commonStyles.font14} numberOfLines={2}>
            {details.name}
          </Text>
        </View>
      </TouchableOpacity>
    </ShadowWrapper>
  );
}
