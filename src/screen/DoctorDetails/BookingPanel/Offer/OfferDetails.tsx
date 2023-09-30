import React from 'react';
import {OfferEntity} from '../../../../types';
import {View} from 'react-native';
import {Text} from '@rneui/themed';

export const OfferDetails = ({selectedOffer}: {selectedOffer: OfferEntity}) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text>{selectedOffer?.name}</Text>
        <Text>Code: {selectedOffer?.code}</Text>
      </View>
      <Text>{selectedOffer?.description}</Text>
    </View>
  );
};
