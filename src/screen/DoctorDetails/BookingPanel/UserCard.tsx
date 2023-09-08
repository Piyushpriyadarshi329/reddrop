import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {getAge} from '../../../utils/dateMethods';
import ShadowWrapper from '../../../component/ShadowWrapper';

interface UserDetails {
  name: string;
  id?: string;
  dob: number;
  gender: Gender;
}
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHERS = 'Others',
}
export const UserCard = ({user}: {user?: UserDetails}) => {
  return (
    <ShadowWrapper>
      <View style={{padding: 10, borderRadius: 10}}>
        <Text>
          {user?.name}({user?.dob && getAge(user?.dob)})
        </Text>
        <Text>{user?.gender}</Text>
      </View>
    </ShadowWrapper>
  );
};
