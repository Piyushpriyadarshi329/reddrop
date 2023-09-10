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
import {useScrollAnimation} from '../ScrollAnimation';

export default function DoctorsList({route}: any) {
  const {data} = route.params;
  const {data: doctors} = useGetDoctorList({clinic_id: data.id});
  const {data: clinics} = useGetcliniclist({});
  const thisClinic = clinics?.find(c => c.id === data.id);

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
  const {AnimatedScrollView, AnimatedView} = useScrollAnimation(250);
  return (
    <View>
      <Navbar title={'Doctors'} hideBorderRadius />
      <AnimatedView style={styles.topContainer}>
        <View style={{flex: 1}}>
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
                  style={[
                    commonStyles.caption,
                    {color: Pallet3.textOnPrimary},
                  ]}>
                  {doctors?.length ?? 0} Doctors Listed
                </Text>

                <Text
                  style={[
                    commonStyles.caption,
                    {color: Pallet3.textOnPrimary},
                  ]}>
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
      </AnimatedView>
      <AnimatedScrollView>
        <>
          {sectionedData.map(section => (
            <View style={{backgroundColor: Color.greybgc}}>
              <View style={{padding: 10}}>
                <Text>{section.title}</Text>
              </View>
              {section.data.map(doctor => (
                <DoctorListCard details={doctor} clinicDetails={thisClinic} />
              ))}
            </View>
          ))}
        </>
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    // marginTop: 40,
    backgroundColor: Pallet3.primary,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-between',
  },
});
