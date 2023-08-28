import React from 'react';
import {Pressable, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/Entypo';
import Color from '../../asset/Color';
import {monthNames, weekdayNames} from './helper';
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
  selecteddate: any;
  i: any;
}) => {
  const fontColor = selecteddate == i ? 'white' : 'black';
  return (
    <ShadowWrapper containerStyle={shadowStyles.flexMargin}>
      <Pressable
        style={{minWidth: 75, borderRadius: 10}}
        onPress={() => {
          setselectedtime('');
          setselecteddate(i);
        }}>
        <View
          style={{
            paddingVertical: 15,
            borderColor: 'grey',
            borderRadius: 10,
            backgroundColor: selecteddate == i ? Color.primary : 'white',
          }}>
          <Text
            style={{
              color: fontColor,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {weekdayNames[i.day]}
          </Text>
          <Text
            style={{
              color: fontColor,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {i.date}
          </Text>
          <Text style={{color: fontColor, fontSize: 16, textAlign: 'center'}}>
            {monthNames[i.month]}
          </Text>
        </View>
      </Pressable>
    </ShadowWrapper>
  );
};
