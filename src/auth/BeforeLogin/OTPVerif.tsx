import {Button, Text} from '@rneui/themed';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {validatePhone} from '../../utils/validations';
import {authFieldStyleProps} from './Home';
import {RegisterForm} from './Register';
import {
  useSendOTP,
  useVerifyOTP,
  useReSendOTP,
} from './useOTPVerificationQuery';
import {COTPInput} from '../../component/COTPInput';
import {
  useCheckMobile,
  useCheckMobileMutation,
} from '../../customhook/useCheckMobile';

const OTPLength = 4;
export const OTPVerif = ({onVerify}: {onVerify: (data: any) => void}) => {
  const formMethods = useFormContext<RegisterForm>();
  const mobile = formMethods.watch('mobile');
  const isMobileValid = useMemo(() => {
    return !validatePhone(mobile);
  }, [mobile]);
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState('');
  const [resend, setResend] = useState(false);
  const [count, setCount] = useState(0);

  const otpInput = useRef<any>();
  useEffect(() => {
    setTimeout(() => {
      otpInput.current?.focusField(0);
    }, 500);
  }, []);
  const {mutate: mutateSendOTP} = useSendOTP({
    onSuccess: () => {
      setOTPSent(true), setCount(1);
    },
  });
  const {mutate: mutateReSendOTP} = useReSendOTP({
    onSuccess: () => {
      setOTPSent(true), setCount(1);
    },
  });
  const {mutate: mutateVerifyOTP} = useVerifyOTP({onSuccess: onVerify});

  const {mutate: checkMobile} = useCheckMobileMutation({
    onSuccess: () => {
      mutateSendOTP(formMethods.getValues('mobile'));
    },
  });

  const onVerifyClick = (otpLocal?: string) => {
    if (!otpSent) {
      setResend(false);
      resendBtnVisible();
      checkMobile(formMethods.getValues('mobile'));
    }
    if (otpSent) {
      mutateVerifyOTP({
        mobile: formMethods.getValues('mobile'),
        otp: otpLocal || otp,
      });
    }
  };

  function resendBtnVisible() {
    setTimeout(() => {
      setResend(true);
    }, 38000);
  }

  useEffect(() => {
    console.log('count', count);
    setTimeout(() => {
      if (count == 30) {
        setCount(0);
        setResend(true);
      } else if (count != 0 && otpSent) {
        setCount(count + 1);
      }
    }, 1000);
  }, [count]);

  async function resendFun() {
    setResend(false);
    resendBtnVisible();

    mutateReSendOTP(formMethods.getValues('mobile'));
  }

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
              setResend(false);
            }}>
            Change
          </Text>
        </View>
      )}
      {otpSent && <COTPInput handleChange={setOTP} />}

      {resend ? (
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={resendFun}>
            <Text style={{color: Color.black, fontSize: 12}}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {otpSent ? (
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Text style={{color: 'black', fontSize: 12}}>
                  Resend OTP in {30 - count}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
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
