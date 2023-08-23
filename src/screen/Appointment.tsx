import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../asset/Color';
import Appointmentcard from '../component/Appointmentcard';
import {usegetAppointments} from '../customhook/usegetAppointments';
import type {RootState} from './../redux/Store';
import {commonStyles} from '../asset/styles';

export default function Appointment() {
  const {Appstate} = useSelector((state: RootState) => state);

  const [selected, setselected] = useState('scheduled');

  const {data: appointments} = usegetAppointments({
    customerId: Appstate.userid,
  });
  const scheduled = appointments?.data?.filter(i => i.status == 'BOOKED');
  const history = appointments?.data?.filter(i => i.status == 'COMPLETED');

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.primary,
        }}>
        <Text style={[commonStyles.font24, commonStyles.weight700]}>
          Appointments
        </Text>
      </View>

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
            setselected('scheduled');
          }}
          style={{
            backgroundColor:
              selected == 'scheduled' ? Color.primary : Color.secondary,
            flex: 1,
            padding: 10,
            borderRadius: 10,
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
            backgroundColor:
              selected == 'history' ? Color.primary : Color.secondary,
            flex: 1,
            padding: 10,
            borderRadius: 10,
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

      <View style={{flex: 12, marginTop: 10}}>
        <ScrollView>
          {selected == 'history' ? (
            <>
              {!history?.length ? (
                <View style={commonStyles.flex1Center}>
                  <Text style={[commonStyles.font18, commonStyles.weight600]}>
                    No Records Found
                  </Text>
                </View>
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
              {!scheduled?.length ? (
                <View style={commonStyles.flex1Center}>
                  <Text style={[commonStyles.font18, commonStyles.weight600]}>
                    No Records Found
                  </Text>
                </View>
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
