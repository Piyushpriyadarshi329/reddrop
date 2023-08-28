import React from 'react';
import {StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

const ShadowWrapper = ({
  children,
  containerStyle,
}: {
  children: JSX.Element;
  containerStyle?: any;
}) => {
  return (
    <Shadow
      distance={5}
      startColor={'#00000010'}
      style={{alignSelf: 'stretch'}}
      containerStyle={containerStyle}>
      {children}
    </Shadow>
  );
};

export default ShadowWrapper;

export const shadowStyles = StyleSheet.create({
  flexMargin: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
  },
});
