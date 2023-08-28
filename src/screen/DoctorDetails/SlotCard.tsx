import {default as React, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Color from '../../asset/Color';
import {Slot, SlotStatus} from '../../types';
import {getSlotColor} from './helper';
import {Tooltip, lightColors} from '@rneui/themed';
import {Shadow} from 'react-native-shadow-2';
import ShadowWrapper, {shadowStyles} from '../../component/ShadowWrapper';

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
      containerStyle={{
        flex: 1,
        backgroundColor: 'pink',
      }}
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
  return (
    <ShadowWrapper containerStyle={shadowStyles.flexMargin}>
      {slot.status != SlotStatus.AVAILABLE ? (
        <ControlledTooltip
          popover={
            <Text>
              {!!(SlotStatus.NA === slot.status)
                ? 'Doctor is on Leave'
                : 'Booked Already'}
            </Text>
          }>
          <View
            style={{
              padding: 5,
              flex: 1,
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
              }}>
              {slot.index}
            </Text>
          </View>
        </ControlledTooltip>
      ) : (
        <TouchableOpacity
          style={{
            padding: 5,
            alignSelf: 'stretch',
            borderRadius: 5,
            backgroundColor: isSelected
              ? Color.primary
              : getSlotColor(slot.status),
          }}
          onPress={() => {
            onPress(slot);
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
              }}>
              {slot.index}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </ShadowWrapper>
  );
};

export default SlotCard;
