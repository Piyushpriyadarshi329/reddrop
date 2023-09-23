import {Text} from '@rneui/themed';
import moment from 'moment';
import {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {View, TouchableOpacity} from 'react-native';
import {ValidationErrors} from '../../asset/constants';
import CalendarModal from '../CalendarModal';
import {commonStyles} from '../../asset/styles';

export const RHFCalendar = (props: {
  name: string;
  placeholder?: string;
  required?: boolean;
  style?: any;
  rules?: any;
  minDate?: string;
  dateFormat?: string;
  label?: string;
}) => {
  const {control} = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Controller
      control={control}
      render={({field, formState: {errors}}) => (
        <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {props.label && (
              <Text
                style={[
                  commonStyles.caption,
                  {fontWeight: '700', color: '#8795a0'},
                ]}>
                {props.label}
              </Text>
            )}
            {field.value ? (
              <Text>
                {moment(Number(field.value)).format(props.dateFormat)}
              </Text>
            ) : (
              <Text style={{borderBottomWidth: 1, borderColor: 'grey'}}>
                {props.placeholder ?? 'Select Date'}
              </Text>
            )}
          </TouchableOpacity>
          <CalendarModal
            {...{
              date: field.value,
              setDate: field.onChange,
              modalVisible: modalVisible,
              setModalVisible: setModalVisible,
              minDate: props.minDate,
            }}
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
