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
}: {
  user?: BookingUserInterface;
  existingAppointment: Appointmentdto;
  onEdit: () => void;
}) => {
  return (
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
  );
};
