import React from 'react';
import {AddressDto} from '../types';
import {Text, View} from 'react-native';
import {commonStyles} from '../asset/styles';

const Address = ({
  details,
  compact,
}: {
  details: AddressDto;
  compact?: boolean;
}) => {
  return (
    <View>
      {!compact && (
        <Text style={commonStyles.font12}>{details.address_line1}</Text>
      )}
      {!compact && (
        <Text style={commonStyles.font}>{details.address_line2}</Text>
      )}
      <Text style={commonStyles.font}>{details.city}</Text>
      {!compact && <Text style={commonStyles.font}>{details.state}</Text>}
      {!compact && <Text style={commonStyles.font}>{details.pincode}</Text>}
    </View>
  );
};

export default Address;
