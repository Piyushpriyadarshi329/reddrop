import {Icon, Text} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Color from '../../../../asset/Color';
import ShadowWrapper from '../../../../component/ShadowWrapper';
import {Appointmentdto} from '../../../../types';
import {BookingUserInterface} from './UserForm';

export const UserCard = ({
  user,
  onEdit,
  existingAppointment,
  errorAlert,
}: {
  user?: BookingUserInterface;
  existingAppointment: Appointmentdto;
  onEdit: () => void;
  errorAlert: any;
}) => {
  console.log('user', user);

  return (
    <View>
      <ShadowWrapper>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 7}}>
                <Text style={{flex: 1, textAlign: 'left'}}>
                  {user?.name}
                  {!!user?.dob ? ` (${user?.dob} Y)` : ` (Age: to be filled)`}
                </Text>
                <Text>{user?.gender}</Text>
              </View>
              <View style={{flex: 1}}>
                {existingAppointment ? null : (
                  <TouchableOpacity
                    onPress={onEdit}
                    style={{
                      padding: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon name="pencil" color={Color.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text>{user?.phone || 'Phone: to be filled'}</Text>

            <Text>{user?.patient_address || 'Address: to be filled'}</Text>
          </View>
        </View>
      </ShadowWrapper>
      <View>
        {errorAlert ? (
          <Text style={{color: 'red'}}>Please Fill user details</Text>
        ) : null}
      </View>
    </View>
  );
};
