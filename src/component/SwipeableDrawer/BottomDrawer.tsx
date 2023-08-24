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

const {height} = Dimensions.get('window');
export enum DrawerState {
  Open = height - 230,
  Peek = 230,
  Closed = 0,
}
interface BottomDrawerProps {
  children?: React.ReactNode;
  initialState: DrawerState;
  onDrawerStateChange: (nextState: DrawerState) => void;
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
    animateMove(y, val);
  };

  const onPanResponderRelease = (
    _: GestureResponderEvent,
    {moveY}: PanResponderGestureState,
  ) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state, valueToMove, margin);
    setState(nextState);
    animateMove(y, nextState, onDrawerStateChange(nextState));
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
          backgroundColor: '#ff1',
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
