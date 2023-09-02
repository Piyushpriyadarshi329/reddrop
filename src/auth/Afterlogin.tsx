import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Apointmentstack from './stack/Apointmentstack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppPages} from '../appPages';
import Color from '../asset/Color';
import Homestack from './stack/Homestack';
import ProfileStack from './stack/ProfileStack';

const Tab = createBottomTabNavigator();

export default function Afterlogin() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';
            if (route.name === AppPages.HomeStack) {
              iconName = 'home';
            } else if (route.name === AppPages.AppointmentStack) {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === AppPages.ProfileStack) {
              iconName = 'ios-person';
            }
            return iconName ? (
              <Ionicons name={iconName} size={size} color={color} />
            ) : (
              <></>
            );
          },
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={AppPages.HomeStack} component={Homestack} />
        <Tab.Screen
          name={AppPages.AppointmentStack}
          component={Apointmentstack}
        />
        <Tab.Screen name={AppPages.ProfileStack} component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
