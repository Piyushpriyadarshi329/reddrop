import React from 'react';
import {Modal, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Color, {Pallet2} from '../asset/Color';
import ModalCloseOnEscape from '../utils/ModalCloseOnEscape';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {ScreenHeight, ScreenWidth} from '@rneui/base';

const CalendarModal = ({
  date,
  setDate,
  modalVisible,
  setModalVisible,
  minDate,
}: {
  date: Date | null;
  setDate: (p: Date) => void;
  modalVisible: boolean;
  setModalVisible: any;
  minDate?: string;
}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      transparent={true}
      visible={modalVisible}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View
        style={{
          marginTop: ScreenHeight / 3,
          marginHorizontal: (ScreenWidth * 1) / 10,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <CalendarPicker
          onDateChange={day => {
            setDate(new Date(day as any));
            setModalVisible(!modalVisible);
          }}
          selectedStartDate={date || undefined}
          textStyle={{
            color: 'black',
          }}
          width={(ScreenWidth * 4) / 5}
          todayBackgroundColor={Color.secondary}
          selectedDayColor={Color.primary}
          selectedDayTextColor="#FFFFFF"
          minDate={new Date(Number(minDate))}
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;
