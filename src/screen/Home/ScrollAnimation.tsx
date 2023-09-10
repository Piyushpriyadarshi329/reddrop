import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useScrollAnimation = (height: number, endHeight?: number) => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(height);

  const actionBar = useAnimatedStyle(() => {
    return {
      height: withTiming(translateY.value, {
        duration: 750,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = height;
        // scolling up
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = endHeight ?? 0;
        // scroll down
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: e => {
      isScrolling.value = true;
    },
    onEndDrag: e => {
      isScrolling.value = false;
    },
  });
  return {
    AnimatedView: ({children, style}: {children: JSX.Element; style?: any}) => (
      <Animated.View style={[style, actionBar]}>{children}</Animated.View>
    ),
    AnimatedScrollView: ({
      children,
      style,
    }: {
      children: JSX.Element;
      style?: any;
    }) => (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={style}>
        {children}
      </Animated.ScrollView>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
  },
  action: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#000',
    width: '50%',
    justifyContent: 'space-around',
  },
  actionItem: {
    color: '#fff',
  },
});
