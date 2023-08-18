import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Color from './../asset/Color';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useLogin} from '../customhook/useLogin';
import {useSelector, useDispatch} from 'react-redux';
import {updateuserdata} from './../redux/reducer/Authreducer';
import {AuthStyles} from './authStyles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useForm, FormProvider} from 'react-hook-form';
import {RHFTextInput} from '../component/RHFTextInput';
interface LoginForm {
  username: string;
  password: string;
}
export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formMethods = useForm<LoginForm>();

  async function submithandler(formValues: LoginForm) {
    try {
      let payload = {
        email: formValues.username,
        password: formValues.password,
        usertype: 1,
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
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('./../asset/image/CAREBOOK.jpg.png')}
        />
      </View>
      <FormProvider {...formMethods}>
        <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
          {/* <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Welcome To Carebook
            </Text>
            <Text style={{color: 'gray', fontSize: 18, fontWeight: '500'}}>
              Please Signin to Continue
            </Text>
          </View> */}

          <View style={AuthStyles.authFieldRow}>
            <Text style={AuthStyles.text}>Login</Text>
          </View>

          <View style={AuthStyles.loginContainer}>
            <View style={AuthStyles.authFieldRow}>
              <Icon name="user" size={20} color="black" />
              <RHFTextInput
                name="username"
                style={AuthStyles.textInput}
                placeholder="Email or Phone"
              />
            </View>

            <View style={AuthStyles.authFieldRow}>
              <Icon name="key" size={20} color="black" />
              <RHFTextInput
                name="password"
                style={AuthStyles.textInput}
                placeholder="Password"
                secureTextEntry={true}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Button
                title="Submit"
                onPress={formMethods.handleSubmit(submithandler)}
                color={Color.primary}
              />
            </View>
          </View>

          <View
            style={{
              flex: 6,
              justifyContent: 'flex-end',
              marginBottom: 30,
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Color.black}}>Don't have an account?</Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={{color: Color.primary, marginLeft: 5}}>
                  Sign up
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </FormProvider>
    </View>
  );
}
