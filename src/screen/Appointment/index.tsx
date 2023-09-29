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
