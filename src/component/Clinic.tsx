import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Fontisto';

export default function Clinic() {
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
            height: 90,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={require('./../asset/image/Clinic.jpeg')}
        />

        <Text style={{color: 'black'}}>Clinic A</Text>
        <Text style={{color: 'black',fontSize:12}}>PHQ Hospital</Text>
        <Text style={{color: 'black',fontSize:12}}>Near Ring Road</Text>
        <View style={{flexDirection:"row",marginTop:2}}>
        <Text
              style={{
                color: 'black',
                fontSize: 10,
                fontWeight: '400',
                marginTop:2,
                textAlign:"right",
                marginLeft:40
                
              }}>
              Bookings 320
            </Text>
          </View>
        {/* <Text style={{color: 'black'}}>4.8</Text> */}
      </TouchableOpacity>
    </View>
  );
}
