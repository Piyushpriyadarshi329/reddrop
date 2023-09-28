import {useNavigation} from '@react-navigation/native';
import {} from '@rneui/base';
import {Text} from '@rneui/themed';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../../asset/Color';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {b4LoginStyles} from './Home';
import {OTPVerif} from './OTPVerif';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const formMethods = useForm<LoginForm>();

  const onOTPVerify = (data: any) => {
    dispatch(
      updateuserdata({
        islogin: true,
        userid: data.id,
        username: data.name,
      }),
    );
  };

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
          <ScrollView
            contentContainerStyle={b4LoginStyles.formContainer}
            keyboardShouldPersistTaps={'always'}>
            <View style={{paddingBottom: 20}}>
              <Text style={{fontSize: 22, color: 'white'}}>Sign in</Text>
              <Text style={{fontSize: 14, color: '#dae0ff'}}>
                Sign in to Continue
              </Text>
            </View>

            <OTPVerif onVerify={onOTPVerify} flow={'login'} />

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
