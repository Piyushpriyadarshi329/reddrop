import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Fragment} from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Color from './src/asset/Color';
import Auth from './src/auth/Auth';
import {store} from './src/redux/Store';

const queryClient = new QueryClient();

export default function App() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Fragment>
          <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar
              backgroundColor={Color.primary}
              barStyle="dark-content"
            />
            <Auth />
          </SafeAreaView>
        </Fragment>
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
