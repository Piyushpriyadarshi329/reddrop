import {default as React} from 'react';

import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {commonStyles} from '../../asset/styles';
import {AddressDto, ClinicWithAddressAndImage, DoctorDto} from '../../types';
import ShadowWrapper, {shadowStyles} from '../../component/ShadowWrapper';
import {Icon} from '@rneui/themed';
import Color from '../../asset/Color';
import GetLocation from 'react-native-get-location';
import {Linking} from 'react-native';
import {VerticalLine} from './VerticalLine';

const DoctorDetails = ({
  doctorDetails,
  clinicDetails,
}: {
  doctorDetails:
    | (DoctorDto & {
        profile_image: string;
      })
    | undefined;
  clinicDetails: ClinicWithAddressAndImage;
}) => {
  const [center, setcenter] = useState({
    latitude: 17.0410971,
    longitude: 74.7486717,
  });

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('location', location);
        setcenter(location);
      })
      .catch(error => {
        console.log('error', error);
        const {code, message} = error;
      });
  }, []);

  function handleGetDirections(address: AddressDto) {
    const url: string = Platform.select({
      ios: 'maps:' + address.lat + ',' + address.lan,
      android:
        'geo:' +
        address.lat +
        ',' +
        address.lan +
        '?q=' +
        address.lat +
        ',' +
        address.lan,
      // 'geo:' +
      // address.lat +
      // ',' +
      // address.lan +
      // `?q=${address.address_line1},${address.address_line2},${address.city}`,
    });

    Linking.openURL(url);
  }

  return (
    <>
      <Text style={commonStyles.caption}>{doctorDetails?.speciality}</Text>
      <Text style={[commonStyles.font20, commonStyles.weight700]}>
        Dr.{doctorDetails?.name}
      </Text>

      <Icon
        name="map-marker"
        color={Color.black}
        containerStyle={{position: 'absolute', right: 10}}
        onPress={() => {
          handleGetDirections(clinicDetails?.address);
        }}
      />

      {doctorDetails?.degree && (
        <Text style={commonStyles.caption}>{doctorDetails?.degree}</Text>
      )}
      <Text style={[commonStyles.font18, commonStyles.weight700]}>
        {clinicDetails?.name}
      </Text>
      <View
        style={{
          marginTop: 10,
        }}>
        <ShadowWrapper>
          <View style={style.detailsCardContainer}>
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Experience</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {doctorDetails?.experience
                  ? `${doctorDetails?.experience + ' Yrs'}`
                  : ''}
              </Text>
            </View>
            <VerticalLine />
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Patients</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {doctorDetails?.no_of_bookings || 'Newly Joined'}
              </Text>
            </View>
            <VerticalLine />
            <View style={style.detailsCard}>
              <Text style={commonStyles.caption}>Fees</Text>
              <Text style={[commonStyles.font18, commonStyles.weight600]}>
                {clinicDetails?.fees}
              </Text>
            </View>
          </View>
        </ShadowWrapper>
      </View>
      {!!doctorDetails?.about?.trim().length && (
        <View style={{paddingVertical: 20}}>
          <Text style={[commonStyles.font18, commonStyles.weight800]}>
            About
          </Text>
          <Text style={commonStyles.font14}>{doctorDetails?.about}</Text>
        </View>
      )}
    </>
  );
};

export default DoctorDetails;

const style = StyleSheet.create({
  detailsCardContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  detailsCard: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
