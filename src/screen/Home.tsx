import {View, Text, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Doctor from '../component/Doctor';
import Clinic from '../component/Clinic';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import Color from '../asset/Color';

export default function Home() {
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [topcliniclist, settopcliniclist] = useState([]);
  const {data: topdoctorlist} = useGetdoctorlist({});
  useEffect(() => {
    getcliniclist();
  }, []);

  async function getcliniclist() {
    try {
      let payload: any = {};

      let res: any = await useGetcliniclist(payload);

      console.log('res clinic', res.data);

      settopcliniclist(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <View style={{flex: 0.4, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="map-marker-alt" size={16} color={Color.primary} />
          <Text style={{color: Color.primary, marginLeft: 5}}>city</Text>
        </View>
        <Text style={{color: 'black', fontSize: 16}}>
          Hi {Appstate.username}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginBottom: 50,
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
            Top Doctors
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <ScrollView horizontal={true}>
            {topdoctorlist?.data?.map((i: any) => {
              return <Doctor data={i} />;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 1.7, flexDirection: 'column', marginTop: -20}}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
              marginTop: 0,
            }}>
            Top Clinics
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <ScrollView horizontal={true}>
            {topcliniclist.map(j => {
              return <Clinic data={j} />;
            })}
          </ScrollView>
        </View>
      </View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
}
