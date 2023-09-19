import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import axios from 'axios';
import {CREATEORDERSANDBOX_Url} from '../../../API_CONFIG';
import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
export default function Payment() {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': 'TEST10005746c2056548bc2418ee255864750001',
      'x-client-secret': 'TEST90c04704a27a535751b200aab1d6319813b3cc8a',
      'x-api-version': '2023-08-01',
      'x-request-id': '"developer_name"',
    },
  };

  async function paymentHandler() {
    try {
      console.log('payment call');
      let payload = {
        order_amount: 1.0,
        order_id: new Date().getTime().toString(),
        order_currency: 'INR',
        customer_details: {
          customer_id: '1',
          customer_name: 'piyush',
          customer_email: 'Piyushpriyadarshi329@gmail.com',
          customer_phone: '8217084947',
        },
        order_meta: {
          notify_url: 'https://test.cashfree.com',
        },
        order_note: 'some order note here',
      };

      const res = await axios.post(CREATEORDERSANDBOX_Url, payload, config);

      console.log(res.data);

      const session = new CFSession(
        res.data.payment_session_id,
        res.data.order_id,
        CFEnvironment.SANDBOX,
      );
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build();
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor('#E64A19')
        .setNavigationBarTextColor('#FFFFFF')
        .setButtonBackgroundColor('#FFC107')
        .setButtonTextColor('#FFFFFF')
        .setPrimaryTextColor('#212121')
        .setSecondaryTextColor('#757575')
        .build();

      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme,
      );
      console.log('dropPayment', dropPayment);

      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        style={{backgroundColor: 'red', flex: 1}}
        onPress={paymentHandler}>
        <Text>Payment</Text>
      </Pressable>
    </View>
  );
}
