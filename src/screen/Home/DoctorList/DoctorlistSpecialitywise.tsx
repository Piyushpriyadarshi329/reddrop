import {Text} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, ScrollView, View, Image} from 'react-native';
import Doctor from '../../../component/Doctor';
import Navbar from '../../../component/Navbar';
import {
  useGetDoctorList,
  useGetDoctorListBySpecialty,
} from '../../DoctorDetails/useDoctorQuery';
import DoctorListCard from './DoctorListCard';
import {Pallet3} from '../../../asset/Color';
import {usegetSpeciality} from '../../../customhook/usegetSpeciality';

export default function DoctorlistSpecialitywise({route}: any) {
  const {data} = route.params;
  const {data: topdoctorlist} = useGetDoctorListBySpecialty({
    specialty: data.name,
  });
  const {data: Specialitylist} = usegetSpeciality();
  const currentSpeciality = Specialitylist?.data?.find(
    s => s.name === data.name,
  );
  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <Navbar title="Doctors" hideBorderRadius />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            marginTop: -20,
            backgroundColor: Pallet3.primary,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1.5}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: Pallet3.textOnPrimary,
                paddingVertical: 2,
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: Pallet3.textOnPrimary,
                paddingVertical: 2,
                textAlign: 'justify',
              }}>
              {data.description}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: 30}}>
            <Image
              source={{uri: currentSpeciality?.speciality_image}}
              width={100}
              height={100}
            />
          </View>
        </View>
        <View style={{flexDirection: 'column', padding: 10}}>
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
            <View style={{gap: 10}}>
              {topdoctorlist?.map(i => {
                return <DoctorListCard details={i} />;
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
