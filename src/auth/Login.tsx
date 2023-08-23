import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Text, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {commonStyles} from '../asset/styles';
import Btn from '../component/Btn';
import {RHFTextInput} from '../component/RHFTextInput';
import {useLogin} from '../customhook/useLogin';
import {validateEmailOrPhone} from '../utils/validations';
import Color from './../asset/Color';
import {updateuserdata} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formMethods = useForm<LoginForm>();
  const [fcm_token, setfcm_token] = useState('');
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

  async function submithandler(formValues: LoginForm) {
    try {
      let payload = {
        email: formValues.username,
        password: formValues.password,
        usertype: 1,
        fcm_token: fcm_token,
      };

      var res: any = await useLogin(payload);

      if (res.Success) {
        dispatch(
          updateuserdata({
            islogin: true,
            userid: res.data.id,
            username: res.data.name,
          }),
        );
      } else {
        Toast.show({
          type: 'error',
          text1: res.Message,
        });
      }
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('./../asset/image/logo.jpeg')}
        />

        <View style={AuthStyles.authFieldRow}>
          <Text
            style={[
              AuthStyles.text,
              {fontSize: 20, fontWeight: '600', color: Color.primary},
            ]}>
            Login
          </Text>
        </View>
      </View>
      <FormProvider {...formMethods}>
        <View style={AuthStyles.loginContainer}>
          <View style={commonStyles.flexRowAlignCenter}>
            <Icon name="user" size={20} color="black" />
            <RHFTextInput
              name="username"
              placeholder="Email/Phone"
              keyboardType="default"
              required
              rules={{validate: validateEmailOrPhone}}
            />
          </View>

          <View style={commonStyles.flexRowAlignCenter}>
            <Icon name="key" size={20} color="black" />
            <RHFTextInput
              name="password"
              secureTextEntry
              placeholder="Password"
              keyboardType="default"
              required
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Btn
              title={'Login'}
              onPress={formMethods.handleSubmit(submithandler)}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
}
