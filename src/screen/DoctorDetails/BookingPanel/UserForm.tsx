import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {RHFTextInput} from '../../../component/RHFInputs/RHFTextInput';
import {RHFCalendar} from '../../../component/RHFInputs/RHFCalendar';
import {RHFDropdown} from '../../../component/RHFInputs/RHFDropdown';
import {Gender} from './UserCard';
import {Button} from '@rneui/themed';
import Color from '../../../asset/Color';

export interface BookingUserInterface {
  id?: string;
  name: string;
  dob: Date;
  gender: Gender;
}
export const UserForm = ({
  onSubmit,
}: {
  onSubmit: (p: BookingUserInterface) => void;
}) => {
  const formMethods = useForm<BookingUserInterface>({
    mode: 'onTouched',
  });
  return (
    <View style={{paddingHorizontal: 40}}>
      <FormProvider {...formMethods}>
        <RHFTextInput name="name" required placeholder="Name" label="Name" />
        <RHFCalendar
          name="dob"
          required
          label="Date of Birth"
          placeholder="Enter DOB"
          dateFormat="ll"
        />
        <RHFDropdown
          name="gender"
          placeholder="Gender"
          label="Gender"
          options={[
            {
              label: 'Male',
              value: Gender.MALE,
            },
            {
              label: 'Female',
              value: Gender.FEMALE,
            },
            {
              label: 'Others',
              value: Gender.OTHERS,
            },
          ]}
          required
          style={{
            borderWidth: 0,
            borderBottomWidth: 1,
          }}
        />
        <Button
          title={'Submit User'}
          color={Color.primary}
          containerStyle={{marginHorizontal: 40}}
          onPress={formMethods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </View>
  );
};
