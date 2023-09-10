import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {ClinicWithAddressAndImage, DoctorDto} from '../types';
import {useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../appPages';
import {useGetcliniclist as useGetClinicsList} from '../customhook/useGetcliniclist';

export default function ClinicsListModel({
  doctorDetails,
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  doctorDetails: DoctorDto;
}) {
  const navigation = useNavigation<any>();

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);

  let {data: clinicsList} = useGetClinicsList(
    {doctor_id: doctorDetails.id},
    data => {
      setSelectedClinic(data?.[0]);
    },
  );
  async function clinicHandler(clinic: ClinicWithAddressAndImage) {
    try {
      navigation.navigate(AppPages.BookApointment, {
        id: doctorDetails.id,
        clinicDetails: clinic,
      });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
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
                  <Text style={{padding: 3}}>{i.address.address_line2}</Text>
                  <Text style={{padding: 3}}>City:{i.address.city}</Text>
                </Pressable>
              </View>
            </>
          );
        })}
      </View>
    </Modal>
  );
}
