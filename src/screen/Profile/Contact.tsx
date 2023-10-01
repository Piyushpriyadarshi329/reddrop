import {View, StyleSheet, Image, Linking} from 'react-native';
import React from 'react';
import {Text} from '@rneui/themed';
import Navbar from '../../component/Navbar';
import {TouchableOpacity} from 'react-native';
import {commonStyles} from '../../asset/styles';
import {FAB} from '@rneui/themed';
import Color from '../../asset/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Contact() {
  const [visible, setVisible] = React.useState(true);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Navbar title="About Us" />

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 20,
          gap: 10,
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../asset/image/logo_removed_bg.png')}
          />

          <View style={{alignItems: 'center'}}>
            <Text style={[commonStyles.font16, commonStyles.weight700]}>
              NOVELBRIX TECHNOLOGY
            </Text>
            <Text style={[commonStyles.font16, commonStyles.weight700]}>
              PRIVATE LIMITED
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 50}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{...commonStyles.caption, color: 'black'}}>
              Mobile:
            </Text>
            <Text style={{...commonStyles.caption, color: 'black'}}>
              +919938222094
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{...commonStyles.caption, color: 'black'}}>
              Email:
            </Text>
            <Text style={{...commonStyles.caption, color: 'black'}}>
              support@carebook.in
            </Text>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 20, left: 20, gap: 5}}>
          <Text
            onPress={() => {
              Linking.openURL('https://www.carebook.in/privacy-policy');
            }}
            style={styles.link}>
            Privacy Policy
          </Text>
          <Text
            onPress={() => {
              Linking.openURL('https://www.carebook.in/terms-conditions');
            }}
            style={styles.link}>
            Terms & Conditions
          </Text>
          <Text
            onPress={() => {
              Linking.openURL('https://www.carebook.in/refund-cancellation');
            }}
            style={styles.link}>
            Refund & Cancellation Policy
          </Text>
        </View>
      </View>

      <FAB
        visible={true}
        onPress={() => {
          Linking.openURL('https://wa.me/919938222094');
        }}
        placement="right"
        color={Color.primary}>
        <Icon name="whatsapp" size={25} color={Color.white} />
      </FAB>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },

  image: {
    resizeMode: 'contain',
    borderRadius: 150,
    height: 150,
    width: 250,
  },
  link: {color: Color.primary, textDecorationLine: 'underline'},
});
