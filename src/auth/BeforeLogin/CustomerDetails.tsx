import {Button, Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Color from '../../asset/Color';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {validateEmail} from '../../utils/validations';
import {authFieldStyleProps} from './Home';
import {RegisterForm} from './Register';

export const CustomerDetails = ({
  onSubmit,
}: {
  onSubmit: (values: RegisterForm) => void;
}) => {
  const [showPW, setShowPW] = useState(false);
  const formMethods = useFormContext<RegisterForm>();
  return (
    <>
      <RHFTextInput
        name={'name'}
        placeholder="Full Name"
        label="Name"
        required
        {...authFieldStyleProps}
      />
      <RHFTextInput
        name="email"
        placeholder="Email"
        label="Email"
        keyboardType="email-address"
        rules={{validate: validateEmail}}
        {...authFieldStyleProps}
      />

      <RHFTextInput
        name="password"
        placeholder="Password"
        label="Password"
        secureTextEntry={!showPW}
        required
        {...authFieldStyleProps}
        rightIcon={
          <Icon
            name={showPW ? 'eye' : 'eye-off'}
            color={'#95e8ff'}
            style={{fontSize: 20, padding: 5}}
            onPressIn={() => {
              setShowPW(true);
            }}
            onPressOut={() => {
              setShowPW(false);
            }}
          />
        }
      />

      <Button
        title="Submit"
        color={'white'}
        titleStyle={{color: Color.primary}}
        onPress={formMethods.handleSubmit(onSubmit)}
      />
    </>
  );
};