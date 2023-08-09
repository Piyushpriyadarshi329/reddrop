import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
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

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  async function submithandler() {
    try {
      let payload = {
        email: email,
        password: password,
        usertype: 1,
      };

      console.log('payload', payload);

      var res: any = await useLogin(payload);

      console.log('res', res);

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
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Welcome To Carebook
          </Text>
        </View>
        <View style={{flex: 1, marginLeft: 50}}>
          <Text style={{color: Color.black, fontSize: 22, fontWeight: 'bold'}}>
            Login
          </Text>
          <Text style={{color: 'gray', fontSize: 18, fontWeight: '500'}}>
            Please Signin to Continue
          </Text>
        </View>

        <View style={{flex: 1, marginLeft: 50}}></View>

        <View style={AuthStyles.loginContainer}>
          <View
            style={{
              marginHorizontal: 70,
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <View style={{marginTop: 10}}>
              <Icon name="user" size={20} color="black" />
            </View>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderRadius: 5,
                marginLeft: 10,
                flex: 1,
                height: 50,
                color: 'black',
              }}
              placeholder="please enter Email"
              keyboardType="email-address"
              value={email}
              onChangeText={text => {
                setemail(text);
              }}
            />
          </View>

          <View
            style={{
              marginHorizontal: 70,
              flex: 1,
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <View style={{marginTop: 10}}>
              <Icon name="key" size={20} color="black" />
            </View>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderRadius: 5,
                marginLeft: 10,
                flex: 1,
                height: 50,
                color: 'black',
              }}
              placeholder="please enter Password"
              keyboardType="email-address"
              value={password}
              onChangeText={text => {
                setpassword(text);
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Color.primary,
                borderRadius: 5,
                height: 40,
              }}
              onPress={submithandler}>
              <Text style={{fontSize: 20, color: 'white', padding: 10}}>
                Submit
              </Text>
            </TouchableOpacity>
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
              <Text style={{color: Color.primary, marginLeft: 5}}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
