import {Image, Text} from '@rneui/themed';
import React from 'react';
import {SectionList, StyleSheet, View, TouchableOpacity} from 'react-native';
import Color, {Pallet3} from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import Navbar from '../../../component/Navbar';
import {useGetcliniclist} from '../../../customhook/useGetcliniclist';
import {useGetDoctorList} from '../../DoctorDetails/useDoctorQuery';
import _ from 'lodash';
import {DoctorDto} from '../../../types';
import DoctorListCard from './DoctorListCard';
import Address from '../../../component/Address';
import openMap from 'react-native-open-maps';

export default function DoctorsList({route}: any) {
  const {data} = route.params;
  const {data: doctors} = useGetDoctorList({clinic_id: data.id});
  const {data: clinics} = useGetcliniclist({});
  const thisClinic = clinics?.find(c => c.id === data.id);

  console.log('thisClinic', thisClinic);
  const groupedDoctors = _.groupBy(
    doctors?.map(d => {
      if (d.speciality == null) {
        d.speciality = 'Others';
      }
      return d;
    }),
    'speciality',
  );
  const sectionedData = Object.entries(groupedDoctors).reduce<
    {title: string; data: DoctorDto[]}[]
  >(
    (array, currentObj) => [
      ...array,
      {title: currentObj[0], data: currentObj[1]},
    ],
    [],
  );
  return (
    <View style={{}}>
      <Navbar title={'Doctors'} />

      <View style={styles.topContainer}>
        <Text style={[commonStyles.font24, {color: Pallet3.textOnPrimary}]}>
          {thisClinic?.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity
              onPress={() => {
                thisClinic?.address.lat &&
                  thisClinic?.address.lan &&
                  openMap({
                    latitude: thisClinic?.address.lat,
                    longitude: thisClinic?.address.lan,
                  });
              }}>
              <View>
                <Text
                  style={{
                    color: Pallet3.textOnPrimary,
                    fontSize: 16,
                  }}>
                  {thisClinic?.address.address_line1}
                </Text>
                {thisClinic?.address.address_line2 && (
                  <Text
                    style={{
                      color: Pallet3.textOnPrimary,
                      fontSize: 12,
                    }}>
                    {thisClinic?.address.address_line2}
                  </Text>
                )}
                <Text
                  style={{
                    color: Pallet3.textOnPrimary,
                    fontSize: 12,
                  }}>
                  {thisClinic?.address.city}, {thisClinic?.address.state} -
                  {thisClinic?.address.pincode}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 10}}>
              <Text
                style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
                {doctors?.length ?? 0} Doctors Listed
              </Text>

              <Text
                style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
                {thisClinic?.about}
              </Text>
            </View>
          </View>
          <Image
            source={
              thisClinic?.profile_image
                ? {
                    uri: thisClinic?.profile_image,
                  }
                : require('./../../../asset/image/Clinic.jpeg')
            }
            style={{
              width: 130,
              height: 130,
              borderRadius: 130,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
      <SectionList
        sections={sectionedData}
        renderSectionHeader={({section}) => (
          <View style={{padding: 10}}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({item}) => <DoctorListCard details={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: Pallet3.primary,
    marginTop: -20,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-between',
  },
});
