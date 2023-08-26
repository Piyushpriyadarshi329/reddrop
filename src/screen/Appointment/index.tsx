import React, {useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import {useUpdateSlotStatus} from '../../customhook/useUpdateSlotStatus';
import type {RootState} from '../../redux/Store';
import Appointmentcard from './Appointmentcard';
import {useGetAppointments} from './useAppointmentQuery';

export default function Appointment() {
  const {Appstate} = useSelector((state: RootState) => state);

  const [selected, setselected] = useState('scheduled');
  const [selectedbookingid, setselectedbookingid] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const {data: appointments} = useGetAppointments({
    customerId: Appstate.userid,
  });
  const scheduled = appointments?.filter(i => i.status == 'BOOKED');
  const history = appointments?.filter(i => i.status == 'COMPLETED');

  const {mutate: UpdateSlotStatus} = useUpdateSlotStatus(() => {
    alert('Status updated Successfully');
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.tertiary,
        }}>
        <Text style={[commonStyles.font24, commonStyles.weight700]}>
          Appointments
        </Text>
      </View>

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
          style={{
            borderBottomColor:
              selected == 'scheduled' ? Color.primary : Color.tertiary,
            borderBottomWidth: 1,
            flex: 1,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'black',
              padding: 5,
              textAlign: 'center',
            }}>
            Scheduled
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselected('history');
          }}
          style={{
            borderBottomColor:
              selected == 'history' ? Color.primary : Color.tertiary,
            borderBottomWidth: 1,
            flex: 1,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'black',
              padding: 5,
              textAlign: 'center',
            }}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 12, marginTop: 10}}>
        <ScrollView>
          {selected == 'history' ? (
            <>
              {!history?.length ? (
                <View style={commonStyles.flex1Center}>
                  <Text style={[commonStyles.font18, commonStyles.weight600]}>
                    No Records Found
                  </Text>
                </View>
              ) : (
                <>
                  {history?.map((i: any) => {
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
          ) : (
            <>
              {!scheduled?.length ? (
                <View style={commonStyles.flex1Center}>
                  <Text style={[commonStyles.font18, commonStyles.weight600]}>
                    No Records Found
                  </Text>
                </View>
              ) : (
                <>
                  {scheduled?.map((i: any, index: number) => {
                    return (
                      <Appointmentcard
                        appointment={i}
                        setModalVisible={setModalVisible}
                        setselectedbookingid={setselectedbookingid}
                        key={index.toString()}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
