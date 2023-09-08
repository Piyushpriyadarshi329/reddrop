import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {getAge} from '../../../utils/dateMethods';
import ShadowWrapper from '../../../component/ShadowWrapper';
import {BookingUserInterface} from './UserForm';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}
export const UserCard = ({user}: {user?: BookingUserInterface}) => {
  return (
    <ShadowWrapper>
      <View style={{padding: 10, borderRadius: 10}}>
        <Text>
          {user?.name}({user?.dob && getAge(user?.dob.getTime())})
        </Text>
        <Text>{user?.gender}</Text>
      </View>
    </ShadowWrapper>
  );
};
