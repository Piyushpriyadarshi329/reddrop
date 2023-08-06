import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Appointment from '../../screen/Appointment';
import BookApointment from '../../screen/BookApointment';
import Payment from '../../screen/Payment';

export default function Apointmentstack() {
  const Apointmentstack = createNativeStackNavigator();

  return (
    <Apointmentstack.Navigator>
      <Apointmentstack.Screen
        name="Appointment"
        component={Appointment}
        options={{headerShown: false}}
      />

      <Apointmentstack.Screen
        name="BookApointment"
        component={BookApointment}
        options={{headerShown: false}}
      />
      <Apointmentstack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Apointmentstack.Navigator>
  );
}
