import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {getCloser} from './utils';

const {diffClamp} = Animated;

const headerHeight = 58 * 2;
export const ScrollWP = (headerHeight: number, hideRatio: number) => {
  const ref = useRef<any>(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight * hideRatio)],
  });

  const translateYNumber = useRef<any>();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({nativeEvent}: any) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight * hideRatio
      )
    ) {
      if (ref.current) {
        ref.current?.scrollToOffset?.({
          offset:
            getCloser(
              translateYNumber.current,
              -headerHeight * hideRatio,
              0,
            ) ===
            -headerHeight * hideRatio
              ? offsetY + headerHeight * hideRatio
              : offsetY - headerHeight * hideRatio,
        });
      }
    }
  };
  return {
    AnimatedView: ({children}: {children: JSX.Element}) => (
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{translateY}],
          },
        ]}>
        {children}
      </Animated.View>
    ),
    AnimatedScrollView: ({children}: {children: JSX.Element}) => (
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight}}
        onScroll={handleScroll}
        ref={ref}
        onMomentumScrollEnd={handleSnap}>
        {children}
      </Animated.ScrollView>
    ),
  };
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <StatusBar backgroundColor="#1c1c1c" />
  //     <Obj.AnimatedView>
  //       <Header {...{headerHeight}} />
  //     </Obj.AnimatedView>
  //     <Obj.AnimatedScrollView>
  //       <>
  //         {data.map(d => (
  //           <ListItem item={d} />
  //         ))}
  //       </>
  //     </Obj.AnimatedScrollView>
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    // backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    top: 50,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    width: '100%',
    height: headerHeight / 2,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
});
