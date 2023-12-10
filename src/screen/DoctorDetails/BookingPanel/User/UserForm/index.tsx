import {Button, FAB, Icon, Input} from '@rneui/themed';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {View, TouchableOpacity} from 'react-native';
import Color from '../../../../../asset/Color';
import {RHFTextInput} from '../../../../../component/RHFInputs/RHFTextInput';
import {Gender} from '../../../../../types';
import {RHFDropdown} from '../../../../../component/RHFInputs/RHFDropdown';
import {genderOptions} from './constants';

export interface BookingUserInterface {
  id?: string;
  name: string;
  dob?: number | string;
  gender: Gender;
  patient_address: string;
  phone: string;
}

export const UserForm = ({
  onSubmit,
  onClose,
  user,
}: {
  onSubmit: (p: BookingUserInterface) => void;
  onClose: () => void;
  user: BookingUserInterface;
}) => {
  const formMethods = useForm<BookingUserInterface>({
    mode: 'onTouched',
    defaultValues: {...user, dob: user.dob?.toString()},
  });

  // useEffect(() => {
  //   formMethods.reset({...user, dob: user.dob?.toString()});
  // }, [user]);

  console.log('user', user);
  return (
    <View style={{paddingHorizontal: 40}}>
      <FormProvider {...formMethods}>
        <View>
          <TouchableOpacity onPress={onClose} style={{alignSelf: 'flex-end'}}>
            <Icon name="close" />
          </TouchableOpacity>
          <View style={{gap: 5}}>
            <RHFTextInput name="name" required placeholder="Name" />
            <View style={{flexDirection: 'row'}}>
              <RHFTextInput
                name="dob"
                keyboardType="numeric"
                // value={user.dob?.toString()}
                placeholder="Age"
                containerStyle={{
                  width: '50%',
                  padding: 0,
                  margin: 0,
                }}
              />
              <RHFDropdown
                name="gender"
                placeholder="Gender"
                options={genderOptions}
                required
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  width: '50%',
                }}
                componentProps={{
                  dropDownContainerStyle: {width: '50%'},
                }}
              />
            </View>

            {/* contact */}

            <RHFTextInput name="phone" required placeholder="Mobile" />

            {/* address */}

            <RHFTextInput name="patient_address" placeholder="Address" />

            <Button
              title={'Save'}
              type="clear"
              titleStyle={{color: Color.primary}}
              containerStyle={{marginHorizontal: 40}}
              onPress={formMethods.handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
};
