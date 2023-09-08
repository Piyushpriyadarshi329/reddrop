import {Image, Text} from '@rneui/themed';
import React from 'react';
import {SectionList, View} from 'react-native';
import {Pallet3} from '../../../asset/Color';
import {commonStyles} from '../../../asset/styles';
import Navbar from '../../../component/Navbar';
import {useGetcliniclist} from '../../../customhook/useGetcliniclist';
import {useGetDoctorList} from '../../DoctorDetails/useDoctorQuery';
import _ from 'lodash';
import {DoctorDto} from '../../../types';
import DoctorListCard from './DoctorListCard';

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
    <>
      <Navbar title={'Doctors'} />
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: Pallet3.primary,
            marginTop: -20,
            paddingTop: 20,
            paddingLeft: 20,
            flexDirection: 'row',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Text style={[commonStyles.font24, {color: Pallet3.textOnPrimary}]}>
              {thisClinic?.name}
            </Text>
            <Text
              style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
              {' '}
              {thisClinic?.address.address_line1}
            </Text>
            <Text
              style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
              {' '}
              {thisClinic?.address.address_line2}
            </Text>
            <Text
              style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
              {' '}
              {thisClinic?.address.city}
            </Text>
            <Text
              style={[commonStyles.caption, {color: Pallet3.textOnPrimary}]}>
              {doctors?.length ?? 0} Doctors Listed
            </Text>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                {/* <Text
                  style={[
                    commonStyles.caption,
                    {color: Pallet3.textOnPrimary},
                  ]}>
                  About
                </Text> */}
                <Text
                  style={[
                    commonStyles.caption,
                    {color: Pallet3.textOnPrimary},
                  ]}>
                  {thisClinic?.about}
                </Text>
              </View>
              <View style={{marginRight: 20, marginTop: -40}}>
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
          </View>
        </View>
        <View style={{flex: 2}}>
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
      </View>
    </>
  );
}
