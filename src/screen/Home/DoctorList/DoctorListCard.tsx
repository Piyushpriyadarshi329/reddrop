import {useNavigation} from '@react-navigation/native';
import {Button, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ClinicWithAddressAndImage, DoctorDto} from '../../../types';
import {updatecustomerdata} from '../../../redux/reducer/Customerreducer';
import {AppPages} from '../../../appPages';
import {commonStyles} from '../../../asset/styles';
import ClinicsListModel from '../../../component/ClinicsListModel';
import {useGetcliniclist as useGetClinicsList} from '../../../customhook/useGetcliniclist';
import {RootState} from '../../../redux/Store';
import {Modal} from 'react-native';
import Color from '../../../asset/Color';

type Location = {
  city: string;
  lat: number;
  lan: number;
};

type Doctor = DoctorDto & {
  profile_image?: string;
  location?: Location[];
  fees?: number;
};

const DoctorListCard = ({
  details,
  clinicDetails,
}: {
  details: Doctor;
  clinicDetails?: ClinicWithAddressAndImage;
}) => {
  console.log('details', details);

  const navigation = useNavigation<any>();
  const {userid, cityName} = useSelector((root: RootState) => root.Appstate);

  const [alertModalVisible, setAlertModalVisible] = useState(false);
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
      if (details.location) {
        let filterCity: Location[] = details.location.filter(
          i => i.city == cityName,
        );

        if (filterCity.length == 0) {
          setAlertModalVisible(true);
          // alert(
          //   `Doctor is available in ${[
          //     details?.location
          //       .map(l => l.city)
          //       .slice(0, -1)
          //       .join(', '),
          //     details.location[details.location.length - 1].city,
          //   ]
          //     .filter(Boolean)
          //     .join('&')} \n\n Please change your city to book`,
          // );
          return;
        }
      }

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
        clinicDetails: clinicsList?.filter(j => j.id == clinic?.id)[0],
      });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {modalVisible && (
        <ClinicsListModel
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          doctorDetails={details}
        />
      )}

      {alertModalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={alertModalVisible}
          onRequestClose={() => {
            setAlertModalVisible(!alertModalVisible);
          }}>
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              flex: 1,
              // opacity: 0.8,
            }}>
            <View
              style={{
                backgroundColor: Color.white,
                marginHorizontal: 40,
                height: 300,
                marginTop: 200,
                opacity: 1,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                }}>{`Doctor is available in ${[
                details?.location
                  .map(l => l.city)
                  .slice(0, -1)
                  .join(', '),
                details.location[details.location.length - 1].city,
              ]
                .filter(Boolean)
                .join(' & ')} \n Please change your city to book.`}</Text>

              <View style={{marginTop: 50, marginHorizontal: 50}}>
                <Button
                  onPress={() => {
                    setAlertModalVisible(false);
                  }}
                  style={{width: 80}}
                  title={'OK'}></Button>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}

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
