import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppPages} from '../../appPages';
import BookApointment from '../../screen/DoctorDetails';
import DoctorsList from '../../screen/Home/DoctorList';
import DoctorlistSpecialitywise from '../../screen/Home/DoctorList/DoctorlistSpecialitywise';
import Home from '../../screen/Home/Home';
import Search from '../../screen/Home/Search';

export default function Homestack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AppPages.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Search}
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.BookApointment}
        component={BookApointment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.Doctorlist}
        component={DoctorsList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={AppPages.DoctorlistSpecialitywise}
        component={DoctorlistSpecialitywise}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
