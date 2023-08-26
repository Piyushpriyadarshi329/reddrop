import {default as React, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Color from '../../asset/Color';
import {Slot, SlotStatus} from '../../types';
import {getSlotColor} from './helper';
import {Tooltip, lightColors} from '@rneui/themed';

const ControlledTooltip: React.FC<any> = props => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      withPointer={false}
      withOverlay={false}
      {...props}
    />
  );
};

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
  return slot.status != SlotStatus.AVAILABLE ? (
    <ControlledTooltip
      popover={
        <Text>
          {!!(SlotStatus.NA === slot.status)
            ? 'Doctor is on Leave'
            : 'Booked Already'}
        </Text>
      }
      width={200}
      backgroundColor={getSlotColor(slot.status)}>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 5,
          borderRadius: 5,
          backgroundColor: isSelected
            ? Color.primary
            : getSlotColor(slot.status),
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            padding: 5,
          }}>
          {slot.index}
        </Text>
      </View>
    </ControlledTooltip>
  ) : (
    <TouchableOpacity
      style={{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: isSelected ? Color.primary : getSlotColor(slot.status),
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
          {slot.index}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SlotCard;
