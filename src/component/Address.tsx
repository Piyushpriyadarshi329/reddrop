import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../asset/styles';
import {ShowAddress} from '../types';

const Address = ({
  details,
  cityOnly,
}: {
  details: ShowAddress | undefined;
  cityOnly?: boolean;
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {!cityOnly && (
        <Text style={commonStyles.font16}>{details?.address_line1}</Text>
      )}
      {!cityOnly && (
        <Text style={commonStyles.font}>{details?.address_line2}</Text>
      )}
      <Text style={commonStyles.font}>{details?.city}</Text>
      {!cityOnly && (
        <Text style={commonStyles.font}>
          {details?.state}
          {!!details?.pincode && ` - ${details?.pincode}`}
        </Text>
      )}
    </View>
  );
};

export default Address;
