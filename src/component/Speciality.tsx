import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {commonStyles} from '../asset/styles';
import {SpecialityDto} from '../types';
import {AppPages} from '../appPages';

export default function Speciality({details}: {details: SpecialityDto}) {
  const navigation = useNavigation<any>();

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
        navigation.navigate(AppPages.DoctorlistSpecialitywise, {data: details});
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
    marginTop: 10,
  },
});
