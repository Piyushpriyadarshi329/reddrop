import {View, TextInput, TouchableOpacity} from 'react-native';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';

import React, {useState} from 'react';
import {useGetSKU} from '../../../../customhook/useGetSKU';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/Store';
import {RHFTextInput} from '../../../../component/RHFInputs/RHFTextInput';
import {CodeType, OfferEntity} from '../../../../types';
import Color from '../../../../asset/Color';
import {useCheckReferralCode} from '../../../../customhook/useCheckReferralCode';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../../../asset/styles';
import {OfferCard} from './OfferCard';
import {OfferDetails} from './OfferDetails';

export default function Offer({route}: {route: any}) {
  const {setSelectedOffer} = route.params;

  const navigation = useNavigation();
  const AppState = useSelector((state: RootState) => state.Appstate);

  let {data: SKUData} = useGetSKU({customerId: AppState.userid});
  console.log('SKUData', SKUData);

  const [referralCode, setReferralCode] = useState('');

  const {mutate: CheckReferral} = useCheckReferralCode({
    onSuccess: (data: OfferEntity) => {
      console.log('data', data);
      setSelectedOffer(data);
      navigation.goBack();
    },
  });

  async function checkReferralFun() {
    const payload = {
      customerId: AppState.userid,
      referralCode: referralCode,
      codeType: CodeType.REFERRAL,
    };

    CheckReferral(payload);
  }

  return (
    <View style={{flex: 1, padding: 10}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={commonStyles.flexRowAlignCenter}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" color={Color.primary} />
          <Text style={{color: Color.primary}}>Edit</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>Choose Offer</Text>
      </View>

      <View style={{marginTop: 10, marginHorizontal: 10, borderRadius: 5}}>
        {SKUData.offers.length > 0 ? (
          <View style={{gap: 10}}>
            {SKUData.offers.map((offer: OfferEntity) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOffer(offer);
                    navigation.goBack();
                  }}
                  style={{
                    backgroundColor: Color.tertiary,
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <OfferDetails selectedOffer={offer} />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View>
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 10,
                justifyContent: 'center',
              }}>
              <Text style={{color: Color.black, textAlign: 'center'}}>
                No Offer found
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
