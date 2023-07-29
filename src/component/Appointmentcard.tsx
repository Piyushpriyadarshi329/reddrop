import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import Color from '../asset/Color';

export default function Appointmentcard({data}: any) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log('data Appointmentcard', data);

  async function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: data,
        }),
      );
      navigation.navigate('BookApointment');
    } catch (error) {
      console.log(error);
    }
  }

  // {"agent_id": null, "clinic_address": null, "clinic_name": "Clinic 1", "created_datetime": "1690629440438", "customer_id": "2fd7b333-ff4f-4205-8252-15aecd9ded25", "doctorSpeciality": null, "doctor_clinic_id": "6696f8f0-ce70-48b2-ad15-64b0ae387a83", "doctor_id": "ca0ca687-51f6-45f0-bf1d-c195e5df8d87", "doctor_image_key": null, "doctorsName": "Piy", "from_working_time": "093000", "group_id": "5923e49e-44e7-4ccc-90dd-1e4ea569124e", "id": "4b3ad830-6aec-4328-a1bd-36f622ec1bf9", "modified_datetime": "1690629440438", "payment_order_id": "418d4758-c1bb-4dd8-a334-a6f58c1c4a31", "slot_index": 0, "status": "BOOKED", "to_working_time": "120000", "workingtime_id": "f1247e5f-8abf-4a45-9c35-d4c9f8ca0686"}

  return (
    <View
      style={{
        flex: 1,
        height: 150,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: Color.primary,
      }}>
      <View style={{flexDirection: 'row', flex: 1.6}}>
        <View style={{flex: 1}}>
          <Image
            style={{
              width: 65,
              height: 65,
              borderRadius: 100,
              marginTop: 10,
              marginLeft: 10,
            }}
            source={require('./../asset/image/doctor.webp')}
          />
        </View>
        <View style={{flex: 2, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            Dr. {data.doctorsName}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>Dental Specialist</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.6, marginTop: 5}}>
        <Text style={{flex: 1, marginLeft: 20, fontSize: 14}}>30 JUL 2023</Text>
        <Text style={{flex: 1, marginLeft: 20}}>
          Slot - {data.slot_index + 1}
        </Text>
      </View>

      <View style={{flexDirection: 'row', flex: 0.7, marginTop: -5}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={{flex: 1, marginLeft: 20}}>Ring Road</Text>
          <Text style={{flex: 1, marginLeft: 20}}>Warje,pune</Text>
        </View>

        <View style={{flex: 1}}>
          <Text>Status:{data.status}</Text>
        </View>
      </View>
    </View>
  );
}
