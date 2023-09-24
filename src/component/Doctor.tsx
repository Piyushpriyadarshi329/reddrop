import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Image, Modal, Pressable, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../asset/styles';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {ClinicWithAddressAndImage, DoctorDto} from '../types';
import ShadowWrapper from './ShadowWrapper';
import {AppPages} from '../appPages';
import {useGetcliniclist as useGetClinicsList} from '../customhook/useGetcliniclist';
import Color from '../asset/Color';
import {Button} from 'react-native';
import {RootState} from '../redux/Store';
import ClinicsListModel from './ClinicsListModel';

export default function Doctor({details}: {details: DoctorDto}) {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.Appstate.cityName);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);

  let {data: clinicsList} = useGetClinicsList({doctor_id: details.id}, data => {
    setSelectedClinic(data?.[0]);
  });

  function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: details,
        }),
      );
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
        <ClinicsListModel
          doctorDetails={details}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />

        <TouchableOpacity
          onPress={clickhandler}
          style={[
            {
              padding: 10,
              width: 140,
              height: 230,
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
            <View style={commonStyles.flexRowAlignCenter}>
              <Text style={commonStyles.font16}>
                <Text style={commonStyles.font12}>Dr. </Text>
                {details.name}
              </Text>
            </View>
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
