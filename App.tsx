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
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import Color from './src/asset/Color';

export default function App() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <Provider store={store}>
      <Fragment>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar backgroundColor={Color.primary} barStyle="dark-content" />
          <Auth />
        </SafeAreaView>
      </Fragment>
    </Provider>
  );
}
