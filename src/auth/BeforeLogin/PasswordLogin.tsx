import React, {useState} from 'react';
import {Icon, Button, Text} from '@rneui/themed';
import {FormProvider, useForm} from 'react-hook-form';
import {RHFTextInput} from '../../component/RHFInputs/RHFTextInput';
import {validateEmailOrPhone} from '../../utils/validations';
import {authFieldStyleProps} from './Home';
import Color from '../../asset/Color';
import {useLoginMutation} from '../../customhook/useLogin';
import {useFCMToken} from '../../common/hooks/useFCMToken';
import {CustomerDto} from '../../types';
import {LoginMethod} from './Login';
interface LoginForm {
  username: string;
  password: string;
}
export const PasswordLogin = ({
  onLogin,
  setLoginMethod,
}: {
  onLogin: (data?: CustomerDto) => void;
  setLoginMethod: any;
}) => {
  const formMethods = useForm<LoginForm>();
  const [showPW, setShowPW] = useState(false);
  const {mutate: login} = useLoginMutation({onSuccess: onLogin});
  const fcm_token = useFCMToken();

  const submitHandler = (formValues: LoginForm) => {
    login({
      userName: formValues.username,
      password: formValues.password,
      fcm_token: fcm_token,
      userType: 1,
    });
  };

  return (
    <FormProvider {...formMethods}>
      <RHFTextInput
        name="username"
        placeholder="Email/Phone"
        label="Email/Phone"
        required
        rules={{validate: validateEmailOrPhone}}
        {...authFieldStyleProps}
      />
      <RHFTextInput
        name="password"
        secureTextEntry={!showPW}
        placeholder="Password"
        label="Password"
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

      <Text
        style={{textAlign: 'center', color: 'white'}}
        onPress={() => setLoginMethod(LoginMethod.OTP)}>
        Login via OTP instead
      </Text>
      <Button
        title="Sign in"
        color={'white'}
        titleStyle={{color: Color.primary}}
        onPress={formMethods.handleSubmit(submitHandler)}
      />
    </FormProvider>
  );
};
