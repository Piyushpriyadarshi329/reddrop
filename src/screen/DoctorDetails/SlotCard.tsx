import {default as React} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Color from '../../asset/Color';
import {Slot, SlotStatus} from '../../types';
import {getSlotColor} from './helper';

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
