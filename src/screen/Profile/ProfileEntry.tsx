import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../../asset/styles';
import {Text} from '@rneui/themed';

export const ProfileEntry = ({label, value}: {label: string; value: any}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={commonStyles.caption}>{label}:</Text>
      <Text style={commonStyles.font18}>{value ?? '- -'}</Text>
    </View>
  );
};
