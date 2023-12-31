import {useNavigation} from '@react-navigation/native';
import {default as React, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Color, {Pallet3} from '../../asset/Color';
import Btn from '../../component/Btn';
import Navbar from '../../component/Navbar';
import BookingPanel from './BookingPanel/BookingPanel';
import DoctorDetails from './DoctorDetails';
import {useGetDoctor} from './useDoctorQuery';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppPages} from '../../appPages';
import {
  Appointmentdto,
  ClinicDto,
  ClinicWithAddressAndImage,
  WorkingTimeDto,
} from '../../types';
import {AppointmentTab} from '../Appointment/helper';
import {Button} from '@rneui/themed';

export default function BookApointment(props: {
  route: {
    params: {
      clinicDetails?: ClinicWithAddressAndImage;
      id: string;
      existing_appointment?: Appointmentdto;
    };
  };
}) {
  console.log('clinicDetails in Booking', props.route.params.clinicDetails);
  const navigation = useNavigation();
  const DoctorBookingStack = createNativeStackNavigator();

  console.log('props.route.params?.id', props.route.params);

  const {data: doctorDetails} = useGetDoctor(props.route.params?.id);
  const onBookingSuccess = () => {
    // navigation.goBack();
  };
  return (
    <>
      <Navbar title="Doctor Details" />
      <View style={style.container}>
        <View style={style.imageContainer}>
          <Image
            style={style.image}
            resizeMode="cover"
            source={
              doctorDetails?.profile_image
                ? {
                    uri: doctorDetails?.profile_image,
                  }
                : require('../../asset/image/doctor.png')
            }
          />
        </View>
      </View>
      <View style={style.bookingContainer}>
        <DoctorBookingStack.Navigator>
          <DoctorBookingStack.Screen
            name="Details"
            component={(route: any) => (
              <View>
                <ScrollView
                  style={{
                    marginBottom: 10,
                    height: '95%',
                  }}>
                  <DoctorDetails
                    doctorDetails={doctorDetails}
                    clinicDetails={
                      props.route.params?.clinicDetails ||
                      ({} as ClinicWithAddressAndImage)
                    }
                  />
                  <View style={{height: 50}} />
                </ScrollView>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                  }}>
                  <Button
                    title="Schedule -> "
                    onPress={() => route.navigation.navigate('Book')}
                  />
                </View>
              </View>
            )}
            options={{headerShown: false}}
          />
          <DoctorBookingStack.Screen
            name="Book"
            component={(route: any) => (
              <BookingPanel
                onClose={() => route.navigation?.goBack()}
                bookingProps={{
                  doctorId: props.route.params?.id,
                  existingAppointment: props.route.params.existing_appointment,
                  clinicDetails: props.route.params?.clinicDetails,
                  onBookingSuccess,
                }}
              />
            )}
            options={{headerShown: false}}
          />
        </DoctorBookingStack.Navigator>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: Pallet3.primary,
    paddingTop: 40,
    marginTop: -20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  image: {
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 250,
    width: 250,
  },
  bookingContainer: {
    flex: 2,
    marginTop: -50,
    marginHorizontal: 5,
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: Color.greybgc,
  },
});
