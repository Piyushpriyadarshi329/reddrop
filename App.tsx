import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Fragment, useState, useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Color from './src/asset/Color';
import Auth from './src/auth/Auth';
import {store} from './src/redux/Store';
import {MenuProvider} from 'react-native-popup-menu';
import Splashscreen from './src/auth/Splashscreen';
import {ThemeProvider, createTheme} from '@rneui/themed';

const queryClient = new QueryClient();
const theme = createTheme({
  mode: 'light',
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
export default function App() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const [showsplash, setshowsplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setshowsplash(false);
    }, 1500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </Provider>
      </MenuProvider>
    </QueryClientProvider>
  );
}
