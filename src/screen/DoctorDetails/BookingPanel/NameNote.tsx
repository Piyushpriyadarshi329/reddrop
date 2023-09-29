import {Text, makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

export const NameNote = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Kindly make sure to enter correct patient's Details. During physical
        appointment these details will be checked and in case of irregularities
        the booking would be cancelled without refund.
      </Text>
    </View>
  );
};

type Props = {};
const useStyles = makeStyles((theme, props?: Props) => ({
  container: {
    padding: 5,
    backgroundColor: '#FFFF88',
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
  },
}));
