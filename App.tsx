import {
  View,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Fragment} from 'react';
import Auth from './src/auth/Auth';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function App() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'red'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
        <StatusBar backgroundColor="#B5F1CC" barStyle="dark-content" />
       
          <Auth />
      </SafeAreaView>
    </Fragment>
  );
}
