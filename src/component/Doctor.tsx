import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Fontisto';

export default function Doctor() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, height: 140, width: 120, marginLeft: 5}}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          navigation.navigate('BookApointment',);
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={require('./../asset/image/doctor.webp')}
        />

        <Text style={{color: 'black'}}>Dr. Mohit Sarma</Text>
        <Text style={{color: 'black',fontSize:12}}>Dental Specialist</Text>
        <View style={{flexDirection:"row",marginTop:2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
                fontWeight: '400',
                marginTop:5,
                textAlign:"right",
                marginLeft:40
                
              }}>
              Bookings 320
            </Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}
