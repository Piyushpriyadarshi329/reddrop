import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppPages} from '../../appPages';
import Appointment from '../../screen/Appointment';
import BookApointment from '../../screen/DoctorDetails';
import Payment from '../../screen/Payment';

export default function Apointmentstack() {
  const Apointmentstack = createNativeStackNavigator();

  return (
    <Apointmentstack.Navigator>
      <Apointmentstack.Screen
        name={AppPages.Appointment}
        component={Appointment}
        options={{headerShown: false}}
      />

      {/* <Apointmentstack.Screen
        name={AppPages.BookApointment}
        component={BookApointment}
        options={{headerShown: false}}
      />
      <Apointmentstack.Screen
        name={AppPages.Payment}
        component={Payment}
        options={{headerShown: false}}
      /> */}
    </Apointmentstack.Navigator>
  );
}
