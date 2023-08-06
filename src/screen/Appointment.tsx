import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import Appointmentcard from '../component/Appointmentcard';
import {usegetAppointments} from '../customhook/usegetAppointments';
import type {RootState} from './../redux/Store';

export default function Appointment() {
  const {Appstate} = useSelector((state: RootState) => state);

  const [selected, setselected] = useState('scheduled');

  const {data: appointments} = usegetAppointments({
    customerId: Appstate.userid,
  });
  const scheduled = appointments?.data?.filter(i => i.status == 'BOOKED');
  const history = appointments?.data?.filter(i => i.status == 'COMPLETED');

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.primary,
        }}>
        <Text style={{fontWeight: '700', fontSize: 16, color: 'black'}}>
          Appointment
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            setselected('scheduled');
          }}
          style={{
            marginHorizontal: 20,
            backgroundColor:
              selected == 'scheduled' ? Color.primary : Color.secondary,
            flex: 1,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'black',
              padding: 5,
              textAlign: 'center',
            }}>
            Scheduled
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselected('history');
          }}
          style={{
            marginHorizontal: 20,
            backgroundColor:
              selected == 'history' ? Color.primary : Color.secondary,
            flex: 1,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'black',
              padding: 5,
              textAlign: 'center',
            }}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 12, marginHorizontal: 10, marginTop: 10}}>
        <ScrollView>
          {selected == 'history' ? (
            <>
              {history?.length == 0 ? (
                <>
                  <View>
                    <Text>No Record Found</Text>
                  </View>
                </>
              ) : (
                <>
                  {history?.map((i: any) => {
                    return (
                      <>
                        <Appointmentcard appointment={i} />
                      </>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              {scheduled?.length == 0 ? (
                <>
                  <View>
                    <Text>No Record Found</Text>
                  </View>
                </>
              ) : (
                <>
                  {scheduled?.map((i: any, index: number) => {
                    return (
                      <Appointmentcard appointment={i} key={index.toString()} />
                    );
                  })}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
