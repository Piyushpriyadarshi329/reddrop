import React from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
} from 'react-native';
import {HorizontalLine} from './HorizontalLine';
import {animateMove, getNextState} from './helper';
import {Button} from '@rneui/base';

const {height} = Dimensions.get('window');
// 30
export enum DrawerState {
  Open = height - 120,
  Peek = 230,
  Closed = 0,
}
interface BottomDrawerProps {
  children?: React.ReactNode;
  initialState: DrawerState;
  onDrawerStateChange?: (nextState: DrawerState) => void;
}
const BottomDrawer = ({
  children,
  onDrawerStateChange,
  initialState,
}: BottomDrawerProps) => {
  const {height} = Dimensions.get('window');
  const y = React.useRef(new Animated.Value(DrawerState.Closed)).current;

  const [state, setState] = React.useState<DrawerState>(initialState);

  const margin = 0.05 * height;
  const movementValue = (moveY: number) => height - moveY;

  const onPanResponderMove = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const val = movementValue(moveY);
    console.log('val', val);
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const valueToMove = movementValue(moveY);
    console.log('valueToMove', valueToMove);
    const nextState = getNextState(state, valueToMove, margin);
    console.log(
      'DrawerState: ',
      DrawerState.Closed,
      DrawerState.Peek,
      DrawerState.Open,
    );
    console.log('nextState', nextState);
    setState(nextState);
    animateMove(y, nextState, onDrawerStateChange?.(nextState));
  };

  const onMoveShouldSetPanResponder = (
    _: GestureResponderEvent,
    {dy}: PanResponderGestureState,
  ) => Math.abs(dy) >= 10;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;
  console.log('y: ', y, height);
  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: height,
          backgroundColor: 'white',
          borderRadius: 25,
          position: 'absolute',
          bottom: -height + 30,
          transform: [{translateY: y}],
        },
      ]}
      {...panResponder.panHandlers}>
      <HorizontalLine />
      {children}
    </Animated.View>
  );
};
export default BottomDrawer;
