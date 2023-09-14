import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import Color from '../asset/Color';
import {ClinicWithAddressAndImage, DoctorDto} from '../types';
import {useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../appPages';
import {useGetcliniclist as useGetClinicsList} from '../customhook/useGetcliniclist';
import {Icon} from '@rneui/themed';
import {useWindowDimensions} from 'react-native';
import ModalCloseOnEscape from '../utils/ModalCloseOnEscape';
import {TouchableOpacity} from 'react-native';
import openMap from 'react-native-open-maps';

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
  const {height} = useWindowDimensions();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View
        style={{
          marginTop: height / 4,
          height: height / 2,
          marginHorizontal: 50,
          backgroundColor: 'white',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: Color.primary,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>Choose Clinic</Text>
          <Icon
            name="close"
            color={'red'}
            containerStyle={{position: 'absolute', right: 10}}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={{gap: 10, marginTop: 20}}>
          {clinicsList?.map(clinic => {
            return (
              <View
                style={{
                  backgroundColor: Color.primary,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    flex: 1,
                  }}
                  onPress={() => {
                    clinicHandler(clinic);
                  }}>
                  <Text style={{color: 'white', fontSize: 18}}>
                    {clinic.name}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {clinic.address.address_line1}
                  </Text>
                  <Text style={{color: 'white'}}>
                    {clinic.address.address_line2}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    openMap({
                      latitude: Number(clinic.address.lat) || 0,
                      longitude: Number(clinic.address.lan) || 0,
                    });
                  }}>
                  <Icon name="navigate" type="ionicon" color={'white'} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}
