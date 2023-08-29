import {Text} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Doctor from '../component/Doctor';
import Navbar from '../component/Navbar';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';

export default function DoctorlistSpecialitywise({route}: any) {
  const {data} = route.params;

  console.log('doctorlist data', data);
  const {data: topdoctorlist} = useGetdoctorlist({speciality: data.name});

  console.log('topdoctorlist specility', topdoctorlist);

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
          {data.name}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          {topdoctorlist?.data.length == 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
                  No Doctor are Availability
                </Text>
              </View>
            </>
          ) : (
            <ScrollView horizontal={true}>
              {topdoctorlist?.data?.map((i: any) => {
                return <Doctor details={i} />;
              })}
            </ScrollView>
          )}
        </View>
      </View>

      <View style={{flex: 1.7, flexDirection: 'column', marginTop: -20}}></View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
}
