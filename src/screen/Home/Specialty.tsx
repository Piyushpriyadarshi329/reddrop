import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SpecialityDto} from '../../types';
import {AppPages} from '../../appPages';
import ShadowWrapper from '../../component/ShadowWrapper';
import {Pallet3} from '../../asset/Color';

export default function Specialty({details}: {details: SpecialityDto}) {
  const navigation = useNavigation<any>();

  return (
    <ShadowWrapper containerStyle={{flex: 1}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate(AppPages.DoctorlistSpecialitywise, {
            data: details,
          });
        }}>
        <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={
              details.speciality_image
                ? {
                    uri: details.speciality_image,
                  }
                : require('../../asset/image/Clinic.jpeg')
            }
          />
        </View>
        <View style={{paddingTop: 5, flex: 1}}>
          <Text style={{fontSize: 12, color: '#00ccff'}} numberOfLines={1}>
            {details.name}
          </Text>
          <View style={{width: '100%'}}></View>
        </View>
      </TouchableOpacity>
    </ShadowWrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
});
