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

interface RegisterForm {
  name: string;
  email: string;
  mobile: Number;
  password: string;
  usertype: string;
}
enum IdentityType {
  MOBILE = 'MOBILE',
  MAIL = 'MAIL',
}
export default function Register() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const formMethods = useForm<RegisterForm>();
  const [fcm_token, setfcm_token] = useState('');
  const [identityType, setIdentityType] = useState<IdentityType>(
    IdentityType.MOBILE,
  );
  const [showPW, setShowPW] = useState(false);

  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        setfcm_token(fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <RHFTextInput
              name={'name'}
              placeholder="Full Name"
              label="Name"
              required
              {...authFieldStyleProps}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text
                style={
                  identityType === IdentityType.MOBILE
                    ? authFieldStyleProps.labelStyle
                    : b4LoginStyles.deselectedText
                }
                onPress={() => setIdentityType(IdentityType.MOBILE)}>
                Mobile No.
              </Text>
              <Text style={b4LoginStyles.deselectedText}>/</Text>
              <Text
                style={
                  identityType === IdentityType.MAIL
                    ? authFieldStyleProps.labelStyle
                    : b4LoginStyles.deselectedText
                }
                onPress={() => setIdentityType(IdentityType.MAIL)}>
                Email Address
              </Text>
            </View>
            {identityType === IdentityType.MAIL ? (
              <RHFTextInput
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                required
                rules={{validate: validateEmail}}
                {...authFieldStyleProps}
              />
            ) : (
              <RHFTextInput
                name="mobile"
                keyboardType="phone-pad"
                placeholder="Mobile No"
                required
                rules={{validate: validatePhone}}
                {...authFieldStyleProps}
              />
            )}

            <RHFTextInput
              name="password"
              placeholder="Password"
              label="Password"
              secureTextEntry={!showPW}
              required
              {...authFieldStyleProps}
              rightIcon={
                <Icon
                  name={showPW ? 'eye' : 'eye-off'}
                  color={'#95e8ff'}
                  style={{fontSize: 20, padding: 5}}
                  onPressIn={() => {
                    setShowPW(true);
                  }}
                  onPressOut={() => {
                    setShowPW(false);
                  }}
                />
              }
            />

            <Button
              title="Submit"
              color={'white'}
              titleStyle={{color: Color.primary}}
              onPress={formMethods.handleSubmit(submitHandler)}
            />
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
