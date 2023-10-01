import {ThemeProvider, createTheme} from '@rneui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {Fragment, useEffect, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Color, {Pallet3} from './src/asset/Color';
import Auth from './src/auth/Auth';
import {store} from './src/redux/Store';
import {useNotificationPermission} from './src/utils/notification';

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
      color: Color.primary,
      buttonStyle: {borderRadius: 10},
      containerStyle: {borderRadius: 10},
    },
    Text: {
      style: {
        fontFamily: 'Poppins-Medium',
      },
    },
    Icon: {
      type: 'material-community',
    },
  },
});
export default function App() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  useNotificationPermission();
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
                  backgroundColor={Pallet3.primary}
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
