import {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ValidationErrors} from '../../asset/constants';

export const RHFDropdown = (props: {
  name: string;
  placeholder?: string;
  required?: boolean;
  style?: any;
  rules?: any;
  options: {label: string; value: string}[];
}) => {
  const {control, getValues} = useFormContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(getValues(props.name));
  return (
    <Controller
      control={control}
      render={({field, formState: {errors}}) => (
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <DropDownPicker
            {...field}
            open={open}
            setOpen={setOpen}
            setValue={() => {}}
            onSelectItem={item => {
              field.onChange(item.value);
            }}
            style={props.style}
            items={props.options}
            placeholder={props.placeholder}
          />
          {errors[props.name]?.message?.toString() && (
            <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
              {errors[props.name]?.message?.toString()}
            </Text>
          )}
        </View>
      )}
      name={props.name}
      rules={{
        required: props.required ? ValidationErrors.Required : undefined,
        ...props.rules,
      }}
    />
  );
};
