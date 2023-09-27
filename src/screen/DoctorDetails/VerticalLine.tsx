import React from 'react';
import {View} from 'react-native';

export const VerticalLine = () => {
  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderColor: 'grey',
        height: '80%',
        alignSelf: 'center',
      }}
    />
  );
};
