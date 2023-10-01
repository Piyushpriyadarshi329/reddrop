import {Text, makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

export const NameNote = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        *Note:&nbsp;&nbsp;Enter correct patient's Details. In case of
        irregularities during physical appointment, the booking would be
        cancelled without any refund.
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
