import {Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {commonStyles} from '../../asset/styles';
import Color, {Pallet3} from '../../asset/Color';
import MenuOptionsComponent from '../../component/MenuOptionsComponent';

const AboutMenuOptions = ({
  onLogout,
  setEditMode,
  setContactUs,
}: {
  setEditMode: () => void;
  setContactUs: () => void;
  onLogout?: () => void;
}) => {
  const options = [
    {
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]}>
          <Icon name="edit" size={17} color={Color.primary} />
          <Text style={commonStyles.font18}>Edit</Text>
        </View>
      ),
      onPress: setEditMode,
    },
    {
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]}>
          <Icon name="edit" size={17} color={Color.primary} />
          <Text style={commonStyles.font18}>Contact us</Text>
        </View>
      ),
      onPress: setContactUs,
    },
  ];

  if (onLogout) {
    options.push({
      item: (
        <View style={[commonStyles.flexRowAlignCenter, {gap: 20}]}>
          <Icon name="power" size={17} color={Color.red} />
          <Text style={{color: Color.red, fontSize: 18}}>Logout</Text>
        </View>
      ),
      onPress: onLogout,
    });
  }
  return (
    <MenuOptionsComponent options={options}>
      <Icon name="menu" size={26} color={Pallet3.textOnPrimary} />
    </MenuOptionsComponent>
  );
};

export default AboutMenuOptions;
