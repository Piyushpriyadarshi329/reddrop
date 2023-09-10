import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {Button, Text, Icon} from '@rneui/themed';
import {} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../../asset/styles';
import Btn from '../../component/Btn';
import {useLogin} from '../../customhook/useLogin';
import {RootState} from '../../redux/Store';
import {validateEmailOrPhone} from '../../utils/validations';
import Color from '../../asset/Color';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {AuthStyles} from '../authStyles';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {authFieldStyleProps, b4LoginStyles} from './Home';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const formMethods = useForm<LoginForm>();
  const [fcm_token, setfcm_token] = useState('');
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

  async function submitHandler(formValues: LoginForm) {
    try {
      let payload = {
        userName: formValues.username,
        password: formValues.password,
        userType: 1,
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
    <View style={b4LoginStyles.container}>
      <View style={b4LoginStyles.topContainer}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('../../asset/image/logo_removed_bg.png')}
        />
      </View>
      <View style={b4LoginStyles.bottomContainerForm}>
        <FormProvider {...formMethods}>
          <ScrollView contentContainerStyle={b4LoginStyles.formContainer}>
            <View style={{paddingBottom: 20}}>
              <Text style={{fontSize: 22, color: 'white'}}>Sign in</Text>
              <Text style={{fontSize: 14, color: '#dae0ff'}}>
                Sign in to Continue
              </Text>
            </View>
            <RHFTextInput
              name="username"
              placeholder="Email/Phone"
              label="Email/Phone"
              required
              rules={{validate: validateEmailOrPhone}}
              {...authFieldStyleProps}
            />
            <RHFTextInput
              name="password"
              secureTextEntry={!showPW}
              placeholder="Password"
              label="Password"
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
              title="Sign in"
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
                <Text style={{color: Color.black}}>Don't have an account?</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  <Text style={{color: 'white', marginLeft: 5}}>Sign up</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </FormProvider>
      </View>
    </View>
  );
}
