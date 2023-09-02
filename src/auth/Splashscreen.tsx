import {View, Text} from 'react-native';
import React from 'react';
import {Image, StatusBar} from 'react-native';

export default function Splashscreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0093d8',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#0093d8'} barStyle="dark-content" />
      <Image
        source={require('./../asset/image/Carebook.jpg')}
        style={{height: 300, width: 300, resizeMode: 'contain'}}></Image>
    </View>
  );
}
