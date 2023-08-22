import {SearchBar} from '@rneui/themed';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../asset/Color';
import {commonStyles} from '../asset/styles';
import Clinic from '../component/Clinic';
import Doctor from '../component/Doctor';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {useGetdoctorlist} from '../customhook/useGetdoctorlist';

export default function Home() {
  const {data: topdoctorlist} = useGetdoctorlist({orderBy: 'BOOKINGS'});
  const {data: topcliniclist} = useGetcliniclist({});

  return (
    <View style={{flex: 1, marginHorizontal: 10, gap: 10}}>
      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.justifyCenter,
          commonStyles.p10,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 10,
          }}>
          <Icon name="map-marker-alt" size={16} color={Color.primary} />
          <Text style={{color: Color.primary, marginLeft: 5}}>City</Text>
        </View>
        <Text style={commonStyles.font20}>Welcome</Text>
      </View>
      <SearchBar round lightTheme containerStyle={styles.searhBarContainer} />
      <View style={{flexDirection: 'column', gap: 10}}>
        <Text style={[commonStyles.font16, commonStyles.weight600]}>
          Top Doctors
        </Text>
        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal={true} contentContainerStyle={{gap: 10}}>
            {topdoctorlist?.data?.map(doctor => {
              return <Doctor details={doctor} key={doctor.id} />;
            })}
          </ScrollView>
        </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10}}>
        <Text style={[commonStyles.font16, commonStyles.weight600]}>
          Top Clinics
        </Text>

        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal={true} contentContainerStyle={{gap: 10}}>
            {topcliniclist?.map(clinic => {
              return <Clinic details={clinic} key={clinic.id} />;
            })}
          </ScrollView>
        </View>
      </View>

      <View style={{flex: 1.5}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  searhBarContainer: {
    borderColor: undefined,
    borderWidth: undefined,
    backgroundColor: undefined,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
