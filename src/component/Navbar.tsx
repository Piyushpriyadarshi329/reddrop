import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color, {Pallet3} from '../asset/Color';
import {useNavigation} from '@react-navigation/native';

const Navbar = (props: {
  title: string;
  onBack?: () => void;
  blockBack?: boolean;
  asFullScreenModal?: boolean;
  endAdornment?: JSX.Element;
  bgc?: string;
  hideBorderRadius?: boolean;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        backgroundColor: props.bgc || Pallet3.primary,
        borderBottomRightRadius: !props.hideBorderRadius ? 20 : 0,
        borderBottomLeftRadius: !props.hideBorderRadius ? 20 : 0,
      }}>
      {!props.asFullScreenModal && !props.blockBack && (
        <View
          onTouchEnd={props.onBack ?? (() => navigation.goBack())}
          style={{position: 'absolute', left: 10, top: 10}}>
          <Icon
            name="keyboard-arrow-left"
            size={24}
            style={{color: Pallet3.textOnPrimary}}
          />
        </View>
      )}
      <Text
        style={{
          color: Pallet3.textOnPrimary,
          fontSize: 20,
          fontWeight: '800',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
      {props.asFullScreenModal && (
        <View
          style={{position: 'absolute', right: 20, top: 10}}
          onTouchEnd={() => navigation.goBack()}>
          <Icon name="close" size={24} style={{color: Pallet3.textOnPrimary}} />
        </View>
      )}
      <View style={{position: 'absolute', right: 10}}>
        {props.endAdornment}
      </View>
    </View>
  );
};

export default Navbar;
