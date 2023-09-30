import React from 'react';
import Color from '../../../../asset/Color';
import {View} from 'react-native';
import {Icon, Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../../../../appPages';
import {OfferEntity} from '../../../../types';

export const ApplyOfferButton = ({
  setSelectedOffer,
}: {
  setSelectedOffer: any;
}) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: Color.tertiary,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate(AppPages.Offer, {
            setSelectedOffer: setSelectedOffer,
          });
        }}>
        <Text style={{marginLeft: 10}}>Apply Offer</Text>
        <View style={{flex: 1}}>
          <Icon
            name="chevron-right"
            style={{alignItems: 'flex-end', marginRight: 10}}
            color={Color.black}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
