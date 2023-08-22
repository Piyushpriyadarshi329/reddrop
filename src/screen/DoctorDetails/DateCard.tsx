import React from 'react';
import {Pressable, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/Entypo';
import Color from '../../asset/Color';
import {monthNames, weekdayNames} from './helper';

export const DateCard = ({
  setselectedtime,
  setselecteddate,
  selecteddate,

  i,
}: {
  setselectedtime: any;
  setselecteddate: any;
  selecteddate: any;
  i: any;
}) => {
  return (
    <Pressable
      style={{flex: 1}}
      onPress={() => {
        setselectedtime('');
        setselecteddate(i);
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'grey',
          marginHorizontal: 5,
          backgroundColor: selecteddate == i ? Color.primary : 'white',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 3,
          }}>
          {weekdayNames[i.day]}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 3,
          }}>
          {i.date}
        </Text>
        <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
          {monthNames[i.month]}
        </Text>
      </View>
    </Pressable>
  );
};
