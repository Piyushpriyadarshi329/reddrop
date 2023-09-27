import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppPages} from '../../appPages';
import Color from '../../asset/Color';
import Navbar from '../../component/Navbar';
import {BookingStatus} from '../../types';
import {AppointmentList} from './AppointmentList';
import {AppointmentTab, appointmentTabToStatus} from './helper';

export default function Appointment() {
  const [selected, setSelected] = useState<AppointmentTab>(
    AppointmentTab.Scheduled,
  );
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log('handling.');
        navigation.navigate(AppPages.HomeStack, {
          screen: AppPages.Home,
          initial: true,
        });
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );
  // useEffect(() => {
  //   const event = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     function () {
  //       /**
  //        * this.onMainScreen and this.goBack are just examples,
  //        * you need to use your own implementation here.
  //        *
  //        * Typically you would use the navigator here to go to the last state.
  //        */
  //       console.log('yes working.');
  //       navigation.navigate(AppPages.HomeStack, {
  //         screen: AppPages.Home,
  //         initial: true,
  //       });
  //       /**
  //        * Returning false will let the event to bubble up & let other event listeners
  //        * or the system's default back action to be executed.
  //        */
  //       return true;
  //     },
  //   );
  //   return event.remove();
  // }, []);
  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
      <Navbar title="Appointments" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 20,
          gap: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelected(AppointmentTab.Scheduled);
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == AppointmentTab.Scheduled
                  ? Color.primary
                  : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>Scheduled</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelected(AppointmentTab.History);
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == AppointmentTab.History
                  ? Color.primary
                  : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(AppointmentTab.Cancelled);
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == AppointmentTab.Cancelled
                  ? Color.primary
                  : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 12, marginTop: 10}}>
        <AppointmentList
          tab={selected}
          showMenuOptions={selected === AppointmentTab.Scheduled}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  tabButton: {
    borderBottomWidth: 1,
    flex: 1,
    borderRadius: 10,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
    padding: 5,
    textAlign: 'center',
  },
});
