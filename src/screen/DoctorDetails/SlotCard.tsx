import {useNavigation} from '@react-navigation/native';
import {default as React, useEffect, useState, useMemo} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {getSlotwisetime, showtime, showtimefromstring} from '../../Appfunction';
import Color from '../../asset/Color';
import Navbar from '../../component/Navbar';
import {useBookslot} from '../../customhook/useBookslot';
import {useGetavailability} from '../../customhook/useGetavailability';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetOccupiedSlots} from '../../customhook/usegetOccupiedSlots';
import type {RootState} from '../../redux/Store';
import {DateCard} from './DateCard';
import {
  BookSlotRequest,
  ClinicDto,
  ClinicWithAddressAndImage,
  Slot,
  SlotStatus,
} from '../../types';
import {useGetBookingAvailability} from './useGetBookingAvailability';
import Btn from '../../component/Btn';

const SlotCard = ({
  slot,
  isSelected,
  onPress,
}: {
  slot: Slot & {
    id: string;
  };
  isSelected?: boolean;
  onPress: (slot: Slot & {id: string}) => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor:
          slot.status === SlotStatus.AVAILABLE
            ? isSelected
              ? Color.primary
              : 'white'
            : 'lightgrey',
      }}
      disabled={slot.status !== SlotStatus.AVAILABLE}
      onPress={() => {
        onPress(slot);
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            padding: 5,
          }}>
          Slot- {slot.index}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SlotCard;
