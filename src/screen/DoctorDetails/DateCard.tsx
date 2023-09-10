import React from 'react';
import {Pressable, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/Entypo';
import Color from '../../asset/Color';
import {DateObj, monthNames, weekdayNames} from './helper';
import {homeStyles} from '../Home/Home';
import ShadowWrapper, {shadowStyles} from '../../component/ShadowWrapper';

export const DateCard = ({
  setselectedtime,
  setselecteddate,
  selecteddate,

  i,
}: {
  setselectedtime: any;
  setselecteddate: any;
  selecteddate: number | undefined;
  i: any;
}) => {
  console.log('i', i.date);
  const fontColor = selecteddate == i.date ? 'white' : 'black';
  return (
    <ShadowWrapper containerStyle={shadowStyles.flexMargin}>
      <Pressable
        style={{minWidth: 75, borderRadius: 10}}
        onPress={() => {
          if (i.available) {
            setselectedtime('');
            setselecteddate(i.date);
          }
        }}>
        <View
          style={{
            paddingVertical: 15,
            borderColor: 'grey',
            borderRadius: 10,
            backgroundColor: i.available
              ? selecteddate == i.date
                ? Color.primary
                : 'white'
              : Color.lightgray,
          }}>
          <Text
            style={{
              color: fontColor,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {weekdayNames[new Date(i?.date).getDay()]}
          </Text>
          <Text
            style={{
              color: fontColor,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {new Date(i?.date).getDate()}
          </Text>
          <Text style={{color: fontColor, fontSize: 16, textAlign: 'center'}}>
            {monthNames[new Date(i?.date).getMonth()]}
          </Text>
        </View>
      </Pressable>
    </ShadowWrapper>
  );
};
