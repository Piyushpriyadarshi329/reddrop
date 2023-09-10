import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Image, Modal, Pressable, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {commonStyles} from '../asset/styles';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {ClinicWithAddressAndImage, DoctorDto} from '../types';
import ShadowWrapper from './ShadowWrapper';
import {AppPages} from '../appPages';
import {useGetcliniclist as useGetClinicsList} from '../customhook/useGetcliniclist';
import Color from '../asset/Color';
import {Button} from 'react-native';

export default function Doctor({details}: {details: DoctorDto}) {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);

  let {data: clinicsList} = useGetClinicsList({doctor_id: details.id}, data => {
    setSelectedClinic(data?.[0]);
  });

  function clickhandler() {
    try {
      if (clinicsList.length > 1) {
        setModalVisible(true);
      } else {
        clinicHandler(clinicsList[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function clinicHandler(clinic: ClinicWithAddressAndImage) {
    try {
      dispatch(
        updatecustomerdata({
          doctor: details,
        }),
      );

      navigation.navigate(AppPages.BookApointment, {
        id: details.id,
        clinicDetails: clinic,
      });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ShadowWrapper>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.lightgray,
            }}>
            <View>
              <Text>Please Select Clinic</Text>
            </View>

            {clinicsList?.map(i => {
              return (
                <>
                  <View
                    style={{
                      backgroundColor: Color.primary,
                      borderRadius: 5,
                      marginTop: 10,
                      width: '75%',
                    }}>
                    <Pressable
                      onPress={() => {
                        console.log('i', i);
                        clinicHandler(i);
                      }}
                      style={{}}>
                      <Text style={{padding: 5}}>Name:{i.name}</Text>
                      <Text style={{padding: 3}}>
                        Address: {i.address.address_line1}
                      </Text>
                      <Text style={{padding: 3}}>
                        {i.address.address_line2}
                      </Text>
                      <Text style={{padding: 3}}>City:{i.address.city}</Text>
                    </Pressable>
                  </View>
                </>
              );
            })}
          </View>
        </Modal>
        <TouchableOpacity
          onPress={clickhandler}
          style={[
            {
              padding: 10,
              width: 130,
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
            },
          ]}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={commonStyles.profileImage}
              source={
                details.profile_image
                  ? {
                      uri: details.profile_image,
                    }
                  : require('./../asset/image/doctor.png')
              }
            />
          </View>
          <View style={{paddingTop: 5, flex: 1}}>
            <Text style={commonStyles.font18} numberOfLines={1}>
              Dr. {details.name}
            </Text>
            <Text style={commonStyles.font12}>{details.speciality}</Text>
            {!!details.no_of_bookings ? (
              <Text style={commonStyles.font12}>
                Bookings {details.no_of_bookings}
              </Text>
            ) : (
              <Text style={commonStyles.font12}></Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ShadowWrapper>
  );
}
