import {SearchBar} from '@rneui/themed';
import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../asset/Color';
import {commonStyles} from '../asset/styles';
import Clinic from '../component/Clinic';
import Doctor from '../component/Doctor';
import Speciality from '../component/Speciality';
import {useGetcliniclist} from '../customhook/useGetcliniclist';
import {usegetSpeciality} from '../customhook/usegetSpeciality';
import DropDownPicker from 'react-native-dropdown-picker';
import {useGetLocation} from '../customhook/useGetLocation';
import {useSelector, useDispatch} from 'react-redux';
import {updateuserdata} from '../redux/reducer/Authreducer';
import {useGetDoctorList} from './DoctorDetails/useDoctorQuery';
import {sliceIntoChunks} from '../utils/jsMethods';
import {SpecialityDto} from '../types';

export default function Home() {
  const {data: topdoctorlist} = useGetDoctorList({orderBy: 'BOOKINGS'});
  const {data: topcliniclist} = useGetcliniclist({});
  const {data: Specialitylist} = usegetSpeciality();
  const {data: Locationlist} = useGetLocation();
  const [selectedlocation, setselectedlocation] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  console.log('Locationlist', Locationlist);

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
          <View style={{marginLeft: -10, marginTop: 10, marginRight: 4}}>
            <Icon name="map-marker-alt" size={16} color={Color.primary} />
          </View>
          <>
            <DropDownPicker
              style={{width: 130, borderWidth: 0, marginTop: -10}}
              searchable={true}
              searchPlaceholder="Search City"
              open={open}
              value={selectedlocation}
              items={
                Locationlist?.data?.map?.(c => ({
                  label: c.name,
                  value: c.id,
                })) ?? []
              }
              setOpen={setOpen}
              setValue={setselectedlocation}
              onChangeValue={value => {
                dispatch(
                  updateuserdata({
                    cityId: value,
                  }),
                );
              }}
              placeholder="Select City"
            />
          </>
        </View>
        <Text style={commonStyles.font20}>Welcome</Text>
      </View>
      <SearchBar round lightTheme containerStyle={styles.searhBarContainer} />
      <ScrollView contentContainerStyle={{gap: 10}}>
        <View style={{flexDirection: 'column', gap: 5}}>
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
        <View style={{flexDirection: 'column', gap: 5}}>
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

const styles = StyleSheet.create({
  searhBarContainer: {
    borderColor: undefined,
    borderWidth: undefined,
    backgroundColor: undefined,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
