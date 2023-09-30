import React from 'react';
import Color from '../../../../asset/Color';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../../../../appPages';
import {OfferEntity} from '../../../../types';
import ShadowWrapper from '../../../../component/ShadowWrapper';
import {OfferDetails} from './OfferDetails';

export const OfferCard = ({
  selectedOffer,
  setSelectedOffer,
}: {
  selectedOffer: OfferEntity;
  setSelectedOffer?: any;
}) => {
  const navigation = useNavigation<any>();
  return (
    <ShadowWrapper>
      <View
        style={{
          backgroundColor: Color.tertiary,
          borderRadius: 10,
          padding: 10,
        }}>
        <Text>Applied Offer</Text>
        <OfferDetails selectedOffer={selectedOffer} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(AppPages.Offer, {
              setSelectedOffer: setSelectedOffer,
            });
          }}
          style={{justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', color: Color.primary}}>
            Change Offer
          </Text>
        </TouchableOpacity>
      </View>
    </ShadowWrapper>
  );
};
