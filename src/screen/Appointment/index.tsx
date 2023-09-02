import React, {useState, useMemo} from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import type {RootState} from '../../redux/Store';
import Appointmentcard from './Appointmentcard';
import {useGetAppointments} from './useAppointmentQuery';
import Navbar from '../../component/Navbar';
import {useAlert} from '../../utils/useShowAlert';
import {BookingStatus} from '../../types';

export default function Appointment() {
  const userid = useSelector((state: RootState) => state.Appstate.userid);
  const {successAlert} = useAlert();
  const [selected, setselected] = useState<
    'scheduled' | 'history' | 'cancelled'
  >('scheduled');
  const [selectedbookingid, setselectedbookingid] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const {data: appointments} = useGetAppointments({
    customerId: userid,
  });
  const data = useMemo(() => {
    switch (selected) {
      case 'cancelled':
        return appointments?.filter(i => i.status == BookingStatus.CANCELLED);
      case 'history':
        return appointments?.filter(i => i.status == BookingStatus.COMPLETED);
      case 'scheduled':
        return appointments?.filter(i => i.status == BookingStatus.BOOKED);
    }
  }, [selected, appointments]);
  const {mutate: UpdateSlotStatus} = useUpdateSlotStatus(() => {
    successAlert('Updated Profile.');
  });

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
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
            marginVertical: 200,
            marginHorizontal: 50,
            backgroundColor: 'lightgray',
            borderRadius: 10,
          }}>
          <View style={{flex: 1}}></View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>Do you want to cancel Booking?</Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button
              style={{marginHorizontal: 10, height: 40}}
              textColor="black"
              buttonColor={Color.primary}
              onPress={() => {
                setModalVisible(false);
              }}>
              Back
            </Button>
            <Button
              style={{marginHorizontal: 10, height: 40}}
              textColor="black"
              buttonColor={Color.primary}
              onPress={() => {
                UpdateSlotStatus({
                  id: selectedbookingid,
                  status: 'CANCELLED',
                });
                setModalVisible(false);
              }}>
              OK
            </Button>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </Modal>
      <Navbar title="Appointments" />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 20,
          gap: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            setselected('scheduled');
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == 'scheduled' ? Color.primary : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>Scheduled</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselected('history');
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == 'history' ? Color.primary : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setselected('cancelled');
          }}
          style={[
            style.tabButton,
            {
              borderBottomColor:
                selected == 'cancelled' ? Color.primary : Color.tertiary,
            },
          ]}>
          <Text style={style.tabText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 12, marginTop: 10}}>
        <ScrollView>
          <>
            {!data?.length ? (
              <View style={commonStyles.flex1Center}>
                <Text style={[commonStyles.font18, commonStyles.weight600]}>
                  No Records Found
                </Text>
              </View>
            ) : (
              <>
                {data?.map((i: any) => {
                  return (
                    <>
                      <Appointmentcard
                        appointment={i}
                        setModalVisible={setModalVisible}
                        setselectedbookingid={setselectedbookingid}
                      />
                    </>
                  );
                })}
              </>
            )}
          </>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  tabButton: {
    borderBottomWidth: 1,
    flex: 1,
    borderRadius: 10,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
    padding: 5,
    textAlign: 'center',
  },
});
