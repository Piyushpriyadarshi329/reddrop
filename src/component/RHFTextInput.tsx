import {useFormContext, Controller} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';

export const RHFTextInput = (props: {
  name: string;
  placeholder?: string;
  required?: boolean;
  style?: any;
  secureTextEntry?: boolean;
}) => {
  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          {...props}
        />
      )}
      name={props.name}
      rules={{required: props.required}}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
});
