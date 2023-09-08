import React, {useState} from 'react';
import {IModalMethods} from '../../../utils/useModalMethods';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Button, CheckBox, Icon, Text} from '@rneui/themed';
import ModalCloseOnEscape from '../../../utils/ModalCloseOnEscape';
import Color from '../../../asset/Color';
import {Gender, UserCard} from './UserCard';
import {BookingOverview} from './BookingOverview';
import {commonStyles} from '../../../asset/styles';
import {useNavigation} from '@react-navigation/native';
import {BookingUserInterface, UserForm} from './UserForm';

export const BookingConfirmation = ({
  modalMethods,
}: {
  modalMethods: IModalMethods;
}) => {
  const [user, setUser] = useState<BookingUserInterface | undefined>({
    dob: new Date('1995-12-17T03:24:00'),
    gender: Gender.MALE,
    name: 'Punyashlok',
  });
  const [showUserForm, setShowUserForm] = useState(false);

  return (
    <Modal
      visible={modalMethods.isOpen}
      onRequestClose={modalMethods.close}
      transparent={true}
      animationType="slide"
      statusBarTranslucent>
      <ModalCloseOnEscape setVisible={modalMethods.close} />
      <View
        style={{
          flex: 1,
          marginVertical: 100,
          marginHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          gap: 10,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={commonStyles.flexRowAlignCenter}
            onPress={modalMethods.close}>
            <Icon name="arrow-left" color={Color.primary} />
            <Text style={{color: Color.primary}}>Edit</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>Confirm Booking</Text>
        </View>
        <BookingOverview />
        {showUserForm || !user ? (
          <UserForm
            onSubmit={user => {
              setUser(user);
              setShowUserForm(false);
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setUser(undefined);
              setShowUserForm(true);
            }}>
            <UserCard user={user} />
          </TouchableOpacity>
        )}
        <Button title={'Book'} color={Color.primary} disabled={!user} />
      </View>
    </Modal>
  );
};
