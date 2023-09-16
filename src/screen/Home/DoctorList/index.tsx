import {Image, Text} from '@rneui/themed';
import React from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  const {AnimatedScrollView, AnimatedView} = useScrollAnimation(400);
  return (
    <View>
      <Navbar title={'Doctors'} hideBorderRadius />
      <ScrollView>
        <View style={styles.topContainer}>
          <View>
            <Text style={[commonStyles.font24, {color: Pallet3.textOnPrimary}]}>
              {thisClinic?.name}
            </Text>
            <View style={{}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{width: '70%'}}
                  onPress={() => {
                    thisClinic?.address.lat &&
                      thisClinic?.address.lan &&
                      openMap({
                        latitude: Number(thisClinic?.address.lat),
                        longitude: Number(thisClinic?.address.lan),
                      });
                  }}>
                  <View>
                    <Text
                      style={{
                        color: Pallet3.textOnPrimary,
                        fontSize: 14,
                      }}>
                      {thisClinic?.address.address_line1}
                    </Text>
                    {thisClinic?.address.address_line2 && (
                      <Text
                        style={{
                          color: Pallet3.textOnPrimary,
                          fontSize: 11,
                        }}>
                        {thisClinic?.address.address_line2}
                      </Text>
                    )}
                    <Text
                      style={{
                        color: Pallet3.textOnPrimary,
                        fontSize: 11,
                      }}>
                      {thisClinic?.address.city}, {thisClinic?.address.state} -
                      {thisClinic?.address.pincode}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    width: '30%',
                  }}>
                  <Image
                    source={
                      thisClinic?.profile_image
                        ? {
                            uri: thisClinic?.profile_image,
                          }
                        : require('./../../../asset/image/Clinic.jpeg')
                    }
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 110,
                    }}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={{paddingTop: 10}}>
                <Text
                  style={[
                    {fontSize: 18, color: 'grey'},
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
          </View>
        </View>
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
          <View style={{height: 100}}></View>
        </>
      </ScrollView>
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
