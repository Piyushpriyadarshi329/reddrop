import {default as React, useEffect} from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import {useRef} from 'react';
import {commonStyles} from '../../../asset/styles';
import BottomDrawer, {
  DrawerState,
} from '../../../component/SwipeableDrawer/BottomDrawer';
import Booking, {BookingProps} from './Booking';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../../asset/Color';

const BookingPanel = ({
  bookingProps,
  onClose,
}: {
  bookingProps: BookingProps;
  onClose: any;
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}
        onTouchEnd={onClose}>
        <Text style={[commonStyles.font18, commonStyles.weight700]}>
          Schedule
        </Text>
        <Icon
          name="close"
          size={24}
          style={{color: Color.red, position: 'absolute', right: 10}}
        />
      </View>
      <Booking {...bookingProps} />
    </>
  );
};

export default BookingPanel;
