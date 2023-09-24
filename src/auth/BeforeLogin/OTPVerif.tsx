import {Button, Text} from '@rneui/themed';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {validatePhone} from '../../utils/validations';
import {authFieldStyleProps} from './Home';
import {RegisterForm} from './Register';
import {useSendOTP, useVerifyOTP} from './useOTPVerificationQuery';

const OTPLength = 4;
export const OTPVerif = ({onVerify}: {onVerify: (data: any) => void}) => {
  const formMethods = useFormContext<RegisterForm>();
  const mobile = formMethods.watch('mobile');
  const isMobileValid = useMemo(() => {
    return !validatePhone(mobile);
  }, [mobile]);
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState('');

  const otpInput = useRef<any>();
  useEffect(() => {
    setTimeout(() => {
      otpInput.current?.focusField(0);
    }, 500);
  }, []);
  const {mutate: mutateSendOTP} = useSendOTP({
    onSuccess: () => setOTPSent(true),
  });
  const {mutate: mutateVerifyOTP} = useVerifyOTP({onSuccess: onVerify});
  const onVerifyClick = (otpLocal?: string) => {
    if (!otpSent) {
      mutateSendOTP(formMethods.getValues('mobile'));
    }
    if (otpSent) {
      mutateVerifyOTP({
        mobile: formMethods.getValues('mobile'),
        otp: otpLocal || otp,
      });
    }
  };

  const isVerifyDisabled = useMemo(
    () => (otpSent ? otp.length !== OTPLength : !isMobileValid),
    [otpSent, otp, isMobileValid],
  );

  return (
    <ScrollView keyboardShouldPersistTaps={'always'}>
      <RHFTextInput
        name={'mobile'}
        placeholder="Mobile Number"
        label="Mobile"
        keyboardType="phone-pad"
        required
        disabled={otpSent}
        rules={{
          validate: validatePhone,
        }}
        {...authFieldStyleProps}
      />
      {otpSent && (
        <View
          style={[commonStyles.flexRowAlignCenter, {justifyContent: 'center'}]}>
          <Text>OTP Sent to Mobile. </Text>
          <Text
            style={{textAlign: 'center', textDecorationLine: 'underline'}}
            onPress={() => {
              setOTP('');
              setOTPSent(false);
            }}>
            Change
          </Text>
        </View>
      )}
      {otpSent && (
        <OTPInputView
          style={{width: '80%', height: 50, alignSelf: 'center'}}
          pinCount={OTPLength}
          autoFocusOnLoad={false}
          code={otp}
          ref={otpInput}
          onCodeChanged={code => setOTP(code)}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            onVerifyClick(code);
          }}
          keyboardType="phone-pad"
        />
      )}
      <Button
        title="Verify"
        color={'white'}
        disabled={isVerifyDisabled}
        titleStyle={{color: Color.primary}}
        onPress={() => onVerifyClick()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
