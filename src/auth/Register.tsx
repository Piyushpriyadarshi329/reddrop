import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRegister} from '../customhook/useRegister';
import {useForm, FormProvider} from 'react-hook-form';
import {AuthStyles} from './authStyles';
import {RHFTextInput} from '../component/RHFTextInput';
import Auth from './Auth';
import {Image} from 'react-native';
interface RegisterForm {
  name: string;
  email: string;
  mobile: Number;
  password: string;
  usertype: string;
}
export default function Register() {
  const navigation = useNavigation();
  const formMethods = useForm<RegisterForm>();

  async function submithandler(formValues: RegisterForm) {
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

        navigation.navigate('Login');
      } else {
        alert(res.Message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('./../asset/image/logo.jpeg')}
        />
      </View>
      {/* <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
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
          Create Account
        </Text>
      </View> */}

      <View style={AuthStyles.authFieldRow}>
        <Text style={AuthStyles.text}>Sign up</Text>
      </View>

      <View style={{flex: 6}}>
        <FormProvider {...formMethods}>
          <View style={AuthStyles.authFieldRow}>
            <Icon name="user" size={20} color="black" />
            <RHFTextInput
              name={'name'}
              placeholder="Full Name"
              style={AuthStyles.textInput}
            />
          </View>
          <View style={AuthStyles.authFieldRow}>
            <Icon name="mobile1" size={20} color="black" />
            <RHFTextInput
              name="mobile"
              keyboardType="phone-pad"
              placeholder="Mobile No."
              style={AuthStyles.textInput}
            />
          </View>

          <View style={AuthStyles.authFieldRow}>
            <MaterialIcon name="email" size={20} color="black" />
            <RHFTextInput
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              style={AuthStyles.textInput}
            />
          </View>

          <View style={AuthStyles.authFieldRow}>
            <MaterialIcon name="key" size={20} color="black" />
            <RHFTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              style={AuthStyles.textInput}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Button
              title="Submit"
              color={Color.primary}
              onPress={formMethods.handleSubmit(submithandler)}
            />
          </View>
        </FormProvider>
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'flex-end',
          marginBottom: 30,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: Color.black}}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: Color.primary, marginLeft: 5}}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
