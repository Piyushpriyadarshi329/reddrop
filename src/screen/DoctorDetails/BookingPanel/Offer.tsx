import {View, TextInput, TouchableOpacity} from 'react-native';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';

import React, {useState} from 'react';
import {useGetSKU} from '../../../customhook/useGetSKU';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import {RHFTextInput} from '../../../component/RHFInputs/RHFTextInput';
import {CodeType, OfferEntity} from '../../../types';
import Color from '../../../asset/Color';
import {useCheckReferralCode} from '../../../customhook/useCheckReferralCode';
import {useNavigation} from '@react-navigation/native';

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
    <View style={{flex: 1}}>
      <View style={{marginTop: 20, marginHorizontal: 10}}>
        {/* <TextInput
          style={{borderWidth: 1, borderRadius: 10, height: 40}}
          placeholder="Please Enter Referral Code"
          onChangeText={text => {
            setReferralCode(text);
          }}
        />

        <Button
          onPress={checkReferralFun}
          title={'Apply'}
          color={Color.primary}
          // loading={isLoading}
        /> */}
      </View>

      <View style={{marginTop: 20, marginHorizontal: 10}}>
        <Text style={{color: Color.black}}>Choose Offer</Text>
      </View>

      <View style={{marginTop: 10, marginHorizontal: 10, borderRadius: 5}}>
        {SKUData.offers.length > 0 ? (
          <>
            {SKUData.offers.map((offer: OfferEntity) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOffer(offer);
                    navigation.goBack();
                  }}>
                  <View
                    style={{backgroundColor: Color.lightgray, borderRadius: 5}}>
                    <Text style={{padding: 5, color: Color.black}}>
                      Code:{offer.name}
                    </Text>
                    <Text style={{color: Color.black, padding: 5}}>
                      {offer.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
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

      <View style={{marginHorizontal: 100, marginTop: 50}}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title={'Back'}
          color={Color.primary}
        />
      </View>
    </View>
  );
}
