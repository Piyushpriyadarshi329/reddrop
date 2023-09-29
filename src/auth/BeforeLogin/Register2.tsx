import {useNavigation} from '@react-navigation/native';
import {Button, Text} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {useRegisterQuery} from '../../customhook/useRegister';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {CustomerDetails} from './CustomerDetails';
import {authFieldStyleProps, b4LoginStyles} from './Home';
import {OTPVerif} from './OTPVerif';
import messaging from '@react-native-firebase/messaging';
import {Gender, SignupRequest, UserType} from '../../types';
import {useCheckMobile} from '../../customhook/useCheckMobile';
import {useCustomerSignUp} from '../../customhook/useCustomerSignUp';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {useUpdateCustomer} from '../../screen/Profile/useCustomerQuery';
import {RootState} from '../../redux/Store';
import {RHFDropdown} from '../../component/RHFInputs/RHFDropdown';
import {RHFCalendar} from '../../component/RHFInputs/RHFCalendar';
import {getToday} from '../../utils/dateMethods';
export interface ProfileForm {
  name?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  dob?: string;
}
export interface RegisterForm {
  gender: string;
  dob: string;
}

export default function Register2() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const formMethods = useForm<RegisterForm>({
    defaultValues: {
      dob: getToday().getTime().toString(),
    },
    mode: 'onTouched',
  });

  const {username, userid, cityName} = useSelector(
    (root: RootState) => root.Appstate,
  );

  // async function submitHandler(formValues: RegisterForm) {
  // let payload: SignupRequest = {
  //   name: formValues.name,
  //   email: formValues.email,
  //   mobile: formValues.mobile,
  //   password: formValues.password,
  //   usertype: UserType.CUSTOMER,
  //   fcm_token: fcm_token,
  // };
  // mutateSignUp(payload);

  const {mutate: update, isLoading} = useUpdateCustomer(userid ?? '', () => {
    dispatch(
      updateuserdata({
        islogin: true,
      }),
    );
  });
  const updateProfileHandler = (formValues: ProfileForm) => {
    update({
      gender: formValues.gender,
      dob: formValues.dob,
    });
  };

  return (
    <View style={b4LoginStyles.container}>
      <View style={b4LoginStyles.topContainer}>
        <Image
          style={{height: 200, width: 300, resizeMode: 'contain'}}
          source={require('../../asset/image/logo.jpeg')}
        />
      </View>

      <View style={b4LoginStyles.bottomContainerForm}>
        <FormProvider {...formMethods}>
          {/* <ScrollView
            contentContainerStyle={b4LoginStyles.signUpFormContainer}
            keyboardShouldPersistTaps="always"> */}
          <View style={{paddingBottom: 20}}>
            {/* <Text style={{fontSize: 22, color: 'white'}}>
                Create An Account
              </Text> */}
            <Text style={{fontSize: 14, color: '#dae0ff'}}>
              Enter Your Details
            </Text>
          </View>
          <>
            <RHFDropdown
              label="Gender"
              labelStyles={{color: Color.black}}
              name="gender"
              options={[
                {label: 'Male', value: Gender.MALE},
                {label: 'Female', value: Gender.FEMALE},
                {label: 'Others', value: Gender.OTHERS},
              ]}
            />
            <RHFCalendar
              labelStyles={{color: Color.black}}
              label="Date of Birth"
              name="dob"
              dateFormat="ll"
            />

            <Button
              title="Submit"
              color={'white'}
              loading={isLoading}
              loadingProps={{color: 'blue'}}
              titleStyle={{color: Color.primary}}
              onPress={() => {
                if (!isLoading) {
                  updateProfileHandler(formMethods.getValues());
                }
              }}
            />
          </>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 10,
            }}></View>
          {/* </ScrollView> */}
        </FormProvider>
      </View>
    </View>
  );
}
