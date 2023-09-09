import {Button, Image} from '@rneui/themed';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {View} from 'react-native';
import Color from '../../asset/Color';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const AuthHome = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={b4LoginStyles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle="dark-content" />
      <View style={b4LoginStyles.topContainer}>
        <Image
          source={require('../../asset/image/logo.jpeg')}
          style={b4LoginStyles.logo}
        />
      </View>
      <View style={b4LoginStyles.bottomContainer}>
        <Button
          title={'Get Started'}
          color={'white'}
          titleStyle={{color: Color.primary}}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
        <Button
          title={'Login'}
          color={'white'}
          titleStyle={{color: Color.primary}}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
};

export const b4LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomContainer: {
    backgroundColor: Color.primary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 40,
    gap: 15,
    paddingTop: 100,
    paddingBottom: 50,
    marginTop: -30,
  },
  bottomContainerForm: {
    backgroundColor: Color.primary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 40,
    gap: 15,
    paddingTop: 50,
    paddingBottom: 50,
    marginTop: -30,
  },
  logo: {height: 100, width: 300, resizeMode: 'cover', borderRadius: 10},
  formContainer: {
    gap: 10,
  },
  signUpFormContainer: {
    gap: 2,
  },
  deselectedText: {
    color: '#95e8ff',
  },
});

export const authFieldStyleProps = {
  placeholderTextColor: '#95e8ff',
  inputContainerStyle: {
    borderColor: '#95e8ff',
    borderWidth: 2,
    borderRadius: 5,
    padding: 0,
    margin: 0,
  },
  inputStyle: {color: 'white'},
  labelStyle: {color: 'white', fontWeight: '800' as any, fontSize: 16},
};
