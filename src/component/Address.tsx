import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../asset/styles';
import {AddressDto} from '../types';

const Address = ({
  details,
  compact,
}: {
  details: AddressDto | undefined;
  compact?: boolean;
}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {!compact && (
        <Text style={commonStyles.font16}>{details?.address_line1}</Text>
      )}
      {!compact && (
        <Text style={commonStyles.font}>{details?.address_line2}</Text>
      )}
      <Text style={commonStyles.font}>{details?.city}</Text>
      {!compact && (
        <Text style={commonStyles.font}>
          {details?.state}
          {!!details?.pincode && ` - ${details?.pincode}`}
        </Text>
      )}
    </View>
  );
};

export default Address;
