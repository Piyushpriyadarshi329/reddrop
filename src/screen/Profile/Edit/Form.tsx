import React from 'react';
import {ScrollView} from 'react-native';
import {RHFTextInput} from '../../../component/RHFInputs/RHFTextInput';
import {RHFDropdown} from '../../../component/RHFInputs/RHFDropdown';
import {RHFCalendar} from '../../../component/RHFInputs/RHFCalendar';
import {Button} from '@rneui/themed';
import Color from '../../../asset/Color';
import {Gender} from '../../DoctorDetails/BookingPanel/UserCard';

const CustomerProfileUpdateForm = ({onSubmit}: {onSubmit: () => void}) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <RHFTextInput name="name" required />
      <RHFTextInput name="email" required />
      <RHFTextInput name="mobile" required />
      <RHFDropdown
        name="gender"
        options={[
          {label: 'Male', value: Gender.MALE},
          {label: 'Female', value: Gender.FEMALE},
          {label: 'Others', value: Gender.OTHERS},
        ]}
      />
      <RHFCalendar name="dob" dateFormat="ll" />
      <Button
        title={'Submit'}
        color={Color.primary}
        onPress={onSubmit}
        containerStyle={{marginHorizontal: 10}}
      />
    </ScrollView>
  );
};

export default CustomerProfileUpdateForm;
