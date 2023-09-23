import {Text} from '@rneui/themed';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Modal, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CustomerDto} from '../../../types';
import {useUpdateCustomer} from '../useCustomerQuery';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import Color from '../../../asset/Color';
import CustomerProfileUpdateForm from './Form';

export interface ProfileForm {
  name?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  dob?: string;
}

export const ProfileModal = ({
  editMode,
  setEditMode,
  details: details,
}: {
  editMode: boolean;
  setEditMode: any;
  details?: CustomerDto;
}) => {
  const formMethods = useForm<ProfileForm>({
    defaultValues: {
      name: details?.name,
      email: details?.email,
      mobile: details?.mobile,
      gender: details?.gender,
      dob: details?.dob,
    },
  });

  useEffect(() => {
    if (details) {
      formMethods.reset({
        name: details.name,
        email: details.email,
        mobile: details.mobile,
        gender: details.gender,
        dob: details.dob,
      });
    }
  }, [details]);
  const {mutate: update} = useUpdateCustomer(details?.id ?? '', () =>
    setEditMode(false),
  );
  const updateProfileHandler = (formValues: ProfileForm) => {
    update({
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      gender: formValues.gender,
      dob: formValues.dob,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editMode}
      onRequestClose={() => setEditMode(false)}>
      <ModalCloseOnEscape setVisible={setEditMode} />

      <FormProvider {...formMethods}>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.tertiary,
            marginTop: 200,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            borderColor: Color.primary,
            borderWidth: 1,
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                Profile
              </Text>
            </View>
            <View style={{position: 'absolute', right: 30}}>
              <TouchableOpacity onPress={() => setEditMode(false)}>
                <Icon
                  name="close"
                  style={{fontWeight: 'bold', fontSize: 25}}
                  color={Color.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <CustomerProfileUpdateForm
            onSubmit={formMethods.handleSubmit(updateProfileHandler)}
          />
        </View>
      </FormProvider>
    </Modal>
  );
};
