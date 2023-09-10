import {useNavigation} from '@react-navigation/native';
import {Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ClinicWithAddressAndImage, DoctorDto} from '../../../types';
import {updatecustomerdata} from '../../../redux/reducer/Customerreducer';
import {AppPages} from '../../../appPages';
import {commonStyles} from '../../../asset/styles';
import ClinicsListModel from '../../../component/ClinicsListModel';
import {useGetcliniclist as useGetClinicsList} from '../../../customhook/useGetcliniclist';

const DoctorListCard = ({
  details,
  clinicDetails,
}: {
  details: DoctorDto;
  clinicDetails?: ClinicWithAddressAndImage;
}) => {
  const navigation = useNavigation<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [selectedClinic, setSelectedClinic] = useState<
    ClinicWithAddressAndImage | undefined
  >(undefined);

  let {data: clinicsList} = useGetClinicsList({doctor_id: details.id}, data => {
    setSelectedClinic(data?.[0]);
  });

  function clickHandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: details,
        }),
      );

      if (clinicDetails) {
        clinicHandler(clinicDetails);
      } else {
        if ((clinicsList?.length ?? 0) > 1) {
          setModalVisible(true);
        } else {
          clinicHandler(clinicsList?.[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function clinicHandler(clinic: ClinicWithAddressAndImage | undefined) {
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
    <>
      <ClinicsListModel
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        doctorDetails={details}
      />
      <TouchableOpacity
        onPress={clickHandler}
        style={[
          {
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
          },
        ]}>
        <View style={{paddingHorizontal: 10}}>
          <Image
            style={commonStyles.profileImage}
            source={
              details.profile_image
                ? {
                    uri: details.profile_image,
                  }
                : require('../../../asset/image/doctor.png')
            }
          />
        </View>
        <View style={{flex: 6}}>
          <Text style={commonStyles.font18}>Dr. {details.name}</Text>
          {details.speciality && (
            <Text style={commonStyles.caption}>{details.speciality}</Text>
          )}
          {!!details.no_of_bookings && (
            <Text style={commonStyles.font12}>
              Bookings {details.no_of_bookings}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DoctorListCard;
