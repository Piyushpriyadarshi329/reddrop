import {SearchBar} from '@rneui/themed';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import Clinic from '../../component/Clinic';
import Doctor from '../../component/Doctor';
import Speciality from '../../component/Speciality';
import {useGetLocation} from '../../customhook/useGetLocation';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetSpeciality} from '../../customhook/usegetSpeciality';
import {RootState} from '../../redux/Store';
import {SpecialityDto} from '../../types';
import {sliceIntoChunks} from '../../utils/jsMethods';
import {useGetDoctorList} from '../DoctorDetails/useDoctorQuery';

export default function Home() {
  const {username, userid} = useSelector((root: RootState) => root.Appstate);
  const {data: topdoctorlist} = useGetDoctorList({orderBy: 'BOOKINGS'});
  const {data: topcliniclist} = useGetcliniclist({});
  const {data: Specialitylist} = usegetSpeciality();
  const {data: Locationlist} = useGetLocation();
  return (
    <View style={{flex: 1, marginHorizontal: 10, gap: 10}}>
      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.justifyCenter,
          commonStyles.p10,
        ]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            padding: 10,
            alignItems: 'center',
          }}>
          <Icon name="map-marker-alt" size={16} color={Color.primary} />
          <Text style={{marginLeft: 10, color: Color.primary}}>Pune</Text>
        </TouchableOpacity>
        <Text style={commonStyles.font18}>Home</Text>
      </View>
      <View style={{gap: 15}}>
        <View>
          <Text style={commonStyles.font20}>Hello {username}👋</Text>
          <Text style={commonStyles.caption}>How are you today ?</Text>
        </View>
        <View>
          <SearchBar
            round
            lightTheme
            containerStyle={homeStyles.searhBarContainer}
            placeholder="Search Doctors and Clinics"
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={{gap: 10}}>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            Top Doctors
          </Text>
          <ScrollView horizontal={true} contentContainerStyle={{gap: 10}}>
            {topdoctorlist?.map(doctor => {
              return <Doctor details={doctor} key={doctor.id} />;
            })}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            Top Clinics
          </Text>

          <ScrollView
            horizontal={true}
            contentContainerStyle={{gap: 10, height: '100%'}}>
            {topcliniclist?.map(clinic => {
              return <Clinic details={clinic} key={clinic.id} />;
            })}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight400]}>
            Select from a category
          </Text>
          <View style={{gap: 10}}>
            {sliceIntoChunks(Specialitylist?.data, 3)?.map(
              (chunk: SpecialityDto[]) => (
                <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
                  {chunk.map(item => (
                    <Speciality details={item} />
                  ))}
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export const homeStyles = StyleSheet.create({
  searhBarContainer: {
    borderColor: undefined,
    borderWidth: undefined,
    backgroundColor: undefined,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    padding: 0,
  },
});
