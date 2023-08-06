import React from 'react';
import {ScrollView, Text, TextInput, View, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Doctor from '../component/Doctor';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';
import Navbar from '../component/Navbar';

export default function Doctorlist({route}: any) {
  const {data} = route.params;

  console.log('doctorlist data', data);
  const {data: topdoctorlist} = useGetdoctorlist({clinic_id: data.id});

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <SafeAreaView />
      <Navbar title="Doctors" />
      <View style={{flex: 1.7, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
            paddingVertical: 2,
          }}>
          Dentists
        </Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <ScrollView horizontal={true}>
            {topdoctorlist?.data?.map((i: any) => {
              return <Doctor data={i} />;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 1.7, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
            paddingVertical: 2,
          }}>
          Heart Specialists
        </Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <ScrollView horizontal={true}>
            {topdoctorlist?.data?.map((i: any) => {
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
