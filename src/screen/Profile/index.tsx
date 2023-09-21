import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../../asset/styles';
import Navbar from '../../component/Navbar';
import ProfilePicUploadModel from '../../component/Profilepicuploadmodel';
import {RootState} from '../../redux/Store';
import {VisibleDocument} from '../../types';
import {getAge} from '../../utils/dateMethods';
import AboutMenuOptions from './MenuOptions';
import {useGetCustomer, useUpdateCustomer} from './useCustomerQuery';
import {ProfileModal} from './Edit/Modal';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {ProfileEntry} from './ProfileEntry';

import {Text} from '@rneui/themed';

export default function Profile() {
  const AppState = useSelector((state: RootState) => state.Appstate);
  const [picmodalVisible, setpicModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const {data: customer} = useGetCustomer(AppState.userid);

  console.log('customer', customer);
  const {mutate: updateCustomer} = useUpdateCustomer(AppState.userid);
  function onUploadPic(data: VisibleDocument | undefined) {
    updateCustomer({
      profile_image_key: data?.fileKey,
    });
  }
  const dispatch = useDispatch();
  return (
    <MenuProvider>
      <Navbar
        title="Profile"
        endAdornment={
          <AboutMenuOptions
            setEditMode={() => setEditModalVisible(true)}
            onLogout={() => {
              dispatch(
                updateuserdata({
                  userid: '',
                  islogin: false,
                  username: '',
                }),
              );
            }}
          />
        }
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setpicModalVisible(true)}>
            <Image
              style={styles.image}
              source={
                customer?.profile_image
                  ? {uri: customer?.profile_image}
                  : require('../../asset/image/profile.png')
              }
            />
          </TouchableOpacity>

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[commonStyles.font24, commonStyles.weight700]}>
              {customer?.name}
            </Text>
            {customer?.dob && (
              <Text style={{...commonStyles.caption, color: 'black'}}>
                {getAge(Number(customer.dob))} Y
              </Text>
            )}
            {customer?.gender && (
              <Text style={commonStyles.caption}>{customer.gender}</Text>
            )}
            <Text style={commonStyles.caption}>{customer?.mobile}</Text>
          </View>
        </View>
        <ScrollView style={{paddingHorizontal: 30, paddingTop: 40}}>
          <ProfileEntry
            label="Appointments till date"
            value={customer?.appointmentsCount ?? 0}
          />
        </ScrollView>
        <ProfileModal
          {...{
            editMode: editModalVisible,
            setEditMode: setEditModalVisible,
            details: customer,
          }}
        />
        <ProfilePicUploadModel
          modalVisible={picmodalVisible}
          setModalVisible={setpicModalVisible}
          onSubmit={onUploadPic}
        />
      </View>
    </MenuProvider>
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
    width: 150,
  },
});
