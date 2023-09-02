import {Text} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, ScrollView, View, Image} from 'react-native';
import Doctor from '../../../component/Doctor';
import Navbar from '../../../component/Navbar';
import {useGetDoctorList} from '../../DoctorDetails/useDoctorQuery';
import DoctorListCard from './DoctorListCard';
import {Pallet3} from '../../../asset/Color';
import {usegetSpeciality} from '../../../customhook/usegetSpeciality';

export default function DoctorlistSpecialitywise({route}: any) {
  const {data} = route.params;
  const {data: topdoctorlist} = useGetDoctorList({speciality: data.name});
  const {data: Specialitylist} = usegetSpeciality();
  const currentSpeciality = Specialitylist?.data?.find(
    s => s.name === data.name,
  );
  console.log(currentSpeciality);
  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <Navbar title="Doctors" />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 40,
          marginTop: -20,
          backgroundColor: Pallet3.primary,
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: Pallet3.textOnPrimary,
            paddingVertical: 2,
          }}>
          {data.name}
        </Text>
        <Image
          source={{uri: currentSpeciality?.speciality_image}}
          width={100}
          height={100}
        />
      </View>
      <View style={{flex: 3, flexDirection: 'column', padding: 10}}>
        {topdoctorlist?.length == 0 ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '700'}}>
                No Doctors Availability
              </Text>
            </View>
          </>
        ) : (
          <ScrollView>
            {topdoctorlist?.map(i => {
              return <DoctorListCard details={i} />;
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
