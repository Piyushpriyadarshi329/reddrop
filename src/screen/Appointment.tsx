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

export default function Appointment() {
  const [selected, setselected] = useState('scheduled');
  const [scheduled, setscheduled] = useState([
    {
      descn: 'Allergy and immunology',
      valule: 1,
    },
    {
      descn: 'Anesthesiology',
      valule: 2,
    },
    {
      descn: 'Dermatology',
      valule: 3,
    },
    {
      descn: 'Diagnostic radiology',
      valule: 4,
    },
    {
      descn: 'Emergency medicine',
      valule: 5,
    },
    {
      descn: 'Medical genetic',
      valule: 8,
    },
    {
      descn: 'Neurology',
      valule: 9,
    },
    {
      descn: 'Nuclear medicine',
      valule: 10,
    },
    {
      descn: 'Physical medicine and rehabilitationy',
      valule: 11,
    },
    {
      descn: 'Pathology',
      valule: 12,
    },
    {
      descn: 'Pediatrics',
      valule: 13,
    },
    {
      descn: 'Allergy and immunology',
      valule: 14,
    },
    {
      descn: 'Anesthesiology',
      valule: 15,
    },
    {
      descn: 'Dermatology',
      valule: 16,
    },
    {
      descn: 'Allergy and immunology',
      valule: 17,
    },
    {
      descn: 'Anesthesiology',
      valule: 18,
    },
    {
      descn: 'Preventive medicine',
      valule: 19,
    },
    {
      descn: 'Urology',
      valule: 20,
    },
  ]);

  const [history, sethistory] = useState([
    {
      active: 1,
      clinic_id: '566fbaf6-7c2c-4cf6-9fc4-e0d038abcce3',
      doctor_id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      email: 'doc@gmail.com',
      id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      mobile: '8217084948',
      name: 'piyush priyadarshi',
      password: '123',
      profile_image_key: null,
    },
    {
      active: 1,
      clinic_id: '566fbaf6-7c2c-4cf6-9fc4-e0d038abcce3',
      doctor_id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      email: 'doc@gmail.com',
      id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      mobile: '8217084948',
      name: 'piyush priyadarshi',
      password: '123',
      profile_image_key: null,
    },
  ]);

  useEffect(() => {
    getappointlist();
  }, []);

  async function getappointlist() {
    try {
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
              {history.map((i: any) => {
                return (
                  <>
                    <Appointmentcard />
                  </>
                );
              })}
            </>
          ) : (
            <>
              {history.map((i: any) => {
                return (
                  <>
                    <Appointmentcard />
                  </>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
