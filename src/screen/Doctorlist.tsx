import {Text} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Doctor from '../component/Doctor';
import Navbar from '../component/Navbar';
import {useGetDoctorList} from './DoctorDetails/useDoctorQuery';

export default function Doctorlist({route}: any) {
  const {data} = route.params;

  console.log('doctorlist data', data);
  const {data: topdoctorlist} = useGetDoctorList({clinic_id: data.id});

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
            {topdoctorlist?.map((i: any) => {
              return <Doctor details={i} />;
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
              return <Doctor details={i} />;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{flex: 1.7, flexDirection: 'column', marginTop: -20}}></View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
}
