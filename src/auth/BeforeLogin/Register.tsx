import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../../asset/Color';
import {useRegisterQuery} from '../../customhook/useRegister';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {CustomerDetails} from './CustomerDetails';
import {b4LoginStyles} from './Home';
import {OTPVerif} from './OTPVerif';
import {SignupRequest, UserType} from '../../types';
import {useCheckMobile} from '../../customhook/useCheckMobile';
import {useCustomerSignUp} from '../../customhook/useCustomerSignUp';
import {useFCMToken} from '../../common/hooks/useFCMToken';

export interface RegisterForm {
  name: string;
  email: string;
  mobile: string;
  password: string;
  usertype: string;
}

export default function Register() {
  const navigation = useNavigation<any>();
  const [otpVerified, setOtpVerified] = useState(false);
  const dispatch = useDispatch();
  const formMethods = useForm<RegisterForm>({
    mode: 'onTouched',
  });
  const {mutate: mutateSignUp, isLoading} = useCustomerSignUp({
    onSuccess: (data: any) => {
      dispatch(
        updateuserdata({
          // islogin: true,
          userid: data?.id,
          username: data?.name,
        }),
      );

      navigation.navigate('Register2');
    },
  });

  const fcm_token = useFCMToken();

  const mobile = formMethods.watch('mobile');

  const {data: userData} = useCheckMobile({mobile});

  async function onVerify(data: any) {
    if (userData) {
      dispatch(
        updateuserdata({
          islogin: true,
          userid: data.id,
          username: data.name,
        }),
      );
    } else {
      setOtpVerified(true);
    }
  }

  async function submitHandler(formValues: RegisterForm) {
    let payload: SignupRequest = {
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      password: formValues.password,
      usertype: UserType.CUSTOMER,
      fcm_token: fcm_token,
    };
    mutateSignUp(payload);
  }

  return (
    <View style={b4LoginStyles.container}>
      <View style={b4LoginStyles.topContainer}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('../../asset/image/logo.jpeg')}
        />
      </View>

      <View style={b4LoginStyles.bottomContainerForm}>
        <FormProvider {...formMethods}>
          <ScrollView
            contentContainerStyle={b4LoginStyles.signUpFormContainer}
            keyboardShouldPersistTaps="always">
            <View style={{paddingBottom: 20}}>
              <Text style={{fontSize: 22, color: 'white'}}>
                Create An Account
              </Text>
              <Text style={{fontSize: 14, color: '#dae0ff'}}>
                Sign up to Continue
              </Text>
            </View>
            {!otpVerified && <OTPVerif onVerify={onVerify} flow={'SIGN_UP'} />}
            {otpVerified && (
              <CustomerDetails onSubmit={submitHandler} isLoading={isLoading} />
            )}
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: Color.black}}>
                  Already have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={{color: 'white', marginLeft: 5}}>Sign in</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </FormProvider>
      </View>
    </View>
  );
}
