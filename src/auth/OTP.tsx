import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {useNavigation} from '@react-navigation/native';
import type {RootState} from '../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import {updateuserdata} from './../redux/reducer/Authreducer';

export default function OTP() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [OTP, setOTP] = useState('');

  async function submithandler() {
    try {
      let payload = {
        mobile: OTP,
      };

      dispatch(
        updateuserdata({
          islogin: true,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 4}}></View>
      <View style={{flex: 5, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>
          Welcome To Carebook
        </Text>
      </View>

      <View style={{flex: 4}}>
        <View
          style={{marginHorizontal: 50, flex: 1, justifyContent: 'flex-start'}}>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderRadius: 5,
              height: 40,
              color: 'black',
            }}
            placeholder="please enter OTP"
            onChangeText={text => {
              setOTP(text);
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: Color.primary, borderRadius: 5}}
            onPress={submithandler}>
            <Text style={{fontSize: 20, color: 'white', padding: 10}}>
              Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 6}}></View>
    </View>
  );
}
