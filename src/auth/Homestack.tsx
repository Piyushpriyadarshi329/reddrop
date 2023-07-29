import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import BookApointment from '../screen/DoctorDetails/BookApointment';
import Doctorlist from '../screen/Doctorlist';

export default function Homestack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookApointment"
        component={BookApointment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Doctorlist"
        component={Doctorlist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
