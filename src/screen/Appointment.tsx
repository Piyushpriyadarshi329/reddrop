import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Doctor from '../component/Doctor';
import Color from '../asset/Color';
import Appointmentcard from '../component/Appointmentcard';
import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from './../redux/Store';
import {usegetAppointments} from '../customhook/usegetAppointments';

export default function Appointment() {
  const {Appstate, customerdata} = useSelector((state: RootState) => state);

  const [selected, setselected] = useState('scheduled');
  const [scheduled, setscheduled] = useState([]);

  const [history, sethistory] = useState([]);

  useEffect(() => {
    getappointlist();
  }, []);

  async function getappointlist() {
    try {
      let payload = {
        customerId: Appstate.userid,
        doctorId: '',
        status: '',
      };

      let getAppointmentsres: any = await usegetAppointments(payload);

      console.log('getAppointmentsres', getAppointmentsres);
      setscheduled(getAppointmentsres.data.filter(i => i.status == 'BOOKED'));
      sethistory(getAppointmentsres.data.filter(i => i.status == 'COMPLETED'));
    } catch (error) {
      console.log(error);
    }
  }

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
              selected == 'scheduled' ? Color.secondary : Color.primary,
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
              selected == 'history' ? Color.secondary : Color.primary,
            flex: 1,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'black',
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
              {history.length == 0 ? (
                <>
                  <View>
                    <Text>No Record Found</Text>
                  </View>
                </>
              ) : (
                <>
                  {history.map((i: any) => {
                    return (
                      <>
                        <Appointmentcard data={i} />
                      </>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              {scheduled.length == 0 ? (
                <>
                  <View>
                    <Text>No Record Found</Text>
                  </View>
                </>
              ) : (
                <>
                  {scheduled.map((i: any) => {
                    return (
                      <>
                        <Appointmentcard data={i} />
                      </>
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
