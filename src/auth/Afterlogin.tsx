import {View, Text} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Appointment from '../screen/Appointment';
import Apointmentstack from './Apointmentstack';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../redux/Store';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../asset/Color';
import Homestack from './Homestack';

const Tab = createBottomTabNavigator();

export default function Afterlogin() {
  const Appstate = useSelector((state: RootState) => state);

  console.log('Appstate', Appstate);

  return (
    <NavigationContainer>
      <Tab.Navigator
        // screenOptions={{ headerShown: false }}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Appointment') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Homestack} />
        <Tab.Screen name="Appointment" component={Apointmentstack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
