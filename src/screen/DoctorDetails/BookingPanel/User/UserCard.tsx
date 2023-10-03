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
  return (
    <View>
      <ShadowWrapper>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>
            {user?.name}
            {!!user?.dob && `(${user?.dob} Y)`}
          </Text>
          <Text>{user?.gender}</Text>

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
      </ShadowWrapper>
      <View>
        {errorAlert ? (
          <Text style={{color: 'red'}}>Please Fill user details</Text>
        ) : null}
      </View>
    </View>
  );
};
