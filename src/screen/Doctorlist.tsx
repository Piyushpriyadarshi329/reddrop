import {View, Text, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Doctor from '../component/Doctor';
import Clinic from '../component/Clinic';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';
import {useGetcliniclist} from '../customhook/useGetcliniclist';

export default function Doctorlist({route}: any) {
  const {data} = route.params;

  console.log('doctorlist data', data);
  const [topdoctorlist, settopdoctorlist] = useState([]);

  useEffect(() => {
    getdoctorlist();
  }, []);

  async function getdoctorlist() {
    try {
      let payload: any = {
        clinic_id: data.id,
      };

      let res: any = await useGetdoctorlist(payload);

      console.log('res doctorlist', res.data);

      settopdoctorlist(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <View style={{flex: 0.4, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="map-marker-alt" size={16} color="black" />
          <Text style={{color: 'black', marginLeft: 5}}>Pune</Text>
        </View>
        <Text style={{color: 'black', fontSize: 16}}>Hi Shlok</Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: -20,
        }}>
        <TextInput
          style={{
            borderWidth: 0.2,
            width: '100%',
            borderRadius: 20,
            textAlign: 'center',
            height: 35,
          }}
          placeholder="🔎 Search Doctors"></TextInput>
        <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>
          Some Nutrition Tip here
        </Text>
      </View>

      <View style={{flex: 1.7, flexDirection: 'column', marginTop: -20}}>
        <View>
          <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
            Doctors
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <ScrollView horizontal={true}>
            {topdoctorlist.map((i: any) => {
              return <Doctor data={i} />;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 1.7, flexDirection: 'column', marginTop: -20}}></View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
}
