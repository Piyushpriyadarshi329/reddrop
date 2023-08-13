import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../asset/Color';
import {updatecustomerdata} from '../redux/reducer/Customerreducer';
import {Appointmentdto} from '../types';
import {useUpdateSlotStatus} from '../customhook/useUpdateSlotStatus';

import Icon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function Appointmentcard({
  appointment,
}: {
  appointment: Appointmentdto;
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const buttonref = useRef(null);

  async function clickhandler() {
    try {
      dispatch(
        updatecustomerdata({
          doctor: appointment,
        }),
      );
      navigation.navigate('BookApointment');
    } catch (error) {
      console.log(error);
    }
  }
  const {mutate: UpdateSlotStatus} = useUpdateSlotStatus(() => {
    alert('Status updated Successfully');

    // navigation.goBack();
  });
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: Color.secondary,
        borderRadius: 10,
        paddingVertical: 10,
      }}>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            marginTop: 290,
            marginLeft: 200,
            width: 100,
            height: 150,
            backgroundColor: 'gold',
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text>Cencal</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Reschudle</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
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
            Dr. {appointment.doctorsName}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>
            {appointment.doctorSpeciality}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginRight: 10,
            marginTop: 5,
          }}>
          <TouchableOpacity
            ref={buttonref}
            onPress={() => {
              setModalVisible(true);
            }}>
            {/* <Icon name="dots-three-horizontal" size={16} color={'black'} /> */}
            <Menu>
              <MenuTrigger>
                <Icon name="dots-three-horizontal" size={16} color={'black'} />
              </MenuTrigger>

              <MenuOptions>
                <MenuOption
                  style={{padding: 5}}
                  onSelect={() => {
                    UpdateSlotStatus({
                      id: appointment.id,
                      status: 'CANCELLED',
                    });
                  }}>
                  <Text style={{color: 'black', padding: 5}}>Cancel</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    navigation.navigate('BookApointment', {
                      existing_appointment: appointment,
                    });
                  }}>
                  <Text style={{color: 'black', padding: 5}}>Reschduled</Text>
                </MenuOption>
                {/* <MenuOption
                  onSelect={() => alert(`Not called`)}
                  disabled={true}
                  text="Disabled"
                /> */}
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 0.6, marginTop: 5}}>
        <Text style={{flex: 1, marginLeft: 20, fontSize: 14, color: 'black'}}>
          {new Date(Number(appointment.appointment_date)).toDateString()}
        </Text>
        <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>
          Slot: {appointment.slot_index}
        </Text>
      </View>

      <View style={{flexDirection: 'row', flex: 0.7, marginTop: -5}}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>
            Ring Road
          </Text>
          <Text style={{flex: 1, marginLeft: 20, color: 'black'}}>
            Warje,pune
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>Status:{appointment.status}</Text>
        </View>
      </View>
    </View>
  );
}
