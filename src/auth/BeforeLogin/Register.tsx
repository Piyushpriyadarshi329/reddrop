import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../../asset/Color';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {useRegister} from '../../customhook/useRegister';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {authFieldStyleProps, b4LoginStyles} from './Home';
import {validateEmail, validatePhone} from '../../utils/validations';
import {CustomerDetails} from './CustomerDetails';
import {OTPVerif} from './OTPVerif';

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
  const formMethods = useForm<RegisterForm>({});

  async function submitHandler(formValues: RegisterForm) {
    try {
      let payload: RegisterForm = {
        name: formValues.name,
        email: formValues.email,
        mobile: formValues.mobile,
        password: formValues.password,
        usertype: 'CUSTOMER',
      };

      let res: any = await useRegister(payload);

      if (res.Success) {
        alert(res.Message);

        console.log('signup res', res);

        dispatch(
          updateuserdata({
            islogin: true,
            userid: res.data.id,
            username: res.data.name,
          }),
        );
      } else {
        alert(res.Message);
      }
    } catch (error) {
      console.log(error);
    }
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
          <ScrollView contentContainerStyle={b4LoginStyles.signUpFormContainer}>
            <View style={{paddingBottom: 20}}>
              <Text style={{fontSize: 22, color: 'white'}}>
                Create An Account
              </Text>
              <Text style={{fontSize: 14, color: '#dae0ff'}}>
                Sign up to Continue
              </Text>
            </View>
            {!otpVerified && <OTPVerif onVerify={() => setOtpVerified(true)} />}
            {otpVerified && <CustomerDetails onSubmit={submitHandler} />}
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
