import {useNavigation} from '@react-navigation/native';
import {default as React, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../asset/Color';
import Btn from '../../component/Btn';
import Navbar from '../../component/Navbar';
import BookingPanel from './BookingPanel/BookingPanel';
import DoctorDetails from './DoctorDetails';
import {useGetDoctor} from './useDoctorQuery';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function BookApointment(props: {route: any}) {
  const navigation = useNavigation();
  const DoctorBookingStack = createNativeStackNavigator();

  const {data: doctorDetails} = useGetDoctor(props.route.params?.id);
  const onBookingSuccess = () => {
    navigation.goBack();
  };
  return (
    <>
      <Navbar title="Doctor Details" bgc={Color.tertiary} />
      <View style={style.container}>
        <View style={style.imageContainer}>
          <Image
            style={style.image}
            source={
              doctorDetails?.profile_image
                ? {
                    uri: doctorDetails?.profile_image,
                  }
                : require('../../asset/image/doctor.webp')
            }
          />
        </View>
      </View>
      <View style={style.bookingContainer}>
        <DoctorBookingStack.Navigator>
          <DoctorBookingStack.Screen
            name="Details"
            component={(route: any) => (
              <View style={{marginBottom: 10}}>
                <DoctorDetails doctorDetails={doctorDetails} />
                <Btn
                  title="Schedule -> "
                  onPress={() => route.navigation.navigate('Book')}
                />
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
    backgroundColor: Color.tertiary,
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
