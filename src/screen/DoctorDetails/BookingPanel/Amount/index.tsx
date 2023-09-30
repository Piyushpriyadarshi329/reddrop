import {Text, makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {SKUItemEntity} from '../../../../types';
import Color from '../../../../asset/Color';
import ShadowWrapper from '../../../../component/ShadowWrapper';

export const PaymentAmount = ({
  SKUData,
  discount,
  gstAmount,
  payableAmount,
}: {
  SKUData?: {amounts?: SKUItemEntity};
  discount: number;
  gstAmount: number;
  payableAmount: number;
}) => {
  const styles = useStyles();
  return (
    <ShadowWrapper>
      <View style={{padding: 10, borderRadius: 10}}>
        <Text>Payment Details</Text>

        <View style={styles.row}>
          <Text>Base Amount</Text>
          <Text>₹&nbsp;{SKUData?.amounts?.amount || 0}</Text>
        </View>
        <View style={styles.row}>
          <Text>Discount</Text>
          <Text>₹&nbsp;{discount}</Text>
        </View>
        <View style={styles.row}>
          <Text>GST</Text>
          <Text>₹&nbsp;{gstAmount}</Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            opacity: 0.5,
            borderColor: Color.black,
            height: 1,
          }}></View>
        <View style={styles.row}>
          <Text>Payable amount</Text>
          <Text>₹&nbsp;{payableAmount}</Text>
        </View>
      </View>
    </ShadowWrapper>
  );
};

const useStyles = makeStyles((theme, props) => ({
  row: {flexDirection: 'row', justifyContent: 'space-between'},
}));
