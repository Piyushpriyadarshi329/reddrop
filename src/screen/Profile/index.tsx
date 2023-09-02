import {useState} from 'react';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles, profileImageStyles} from '../../asset/styles';
import Profilepicuploadmodel from '../../component/Profilepicuploadmodel';
import {RootState} from '../../redux/Store';
import {VisibleDocument} from '../../types';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {useGetCustomer} from './useCustomerQuery';
import EditButton from '../../component/EditButton';
import {MenuProvider} from 'react-native-popup-menu';
import Navbar from '../../component/Navbar';
import {useNavigation} from '@react-navigation/native';
import AboutMenuOptions from './MenuOptions';

export default function Profile() {
  const dispatch = useDispatch();
  const Appstate = useSelector((state: RootState) => state.Appstate);
  const [picmodalVisible, setpicModalVisible] = useState(false); // profile pic
  const {data: customer} = useGetCustomer(Appstate.userid);
  function uploadprofilpicfun(data: VisibleDocument | undefined) {}
  return (
    <MenuProvider>
      <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
        <Navbar
          title="Profile"
          endAdornment={
            <AboutMenuOptions setEditMode={() => {}} onLogout={() => {}} />
          }
        />
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
            <Text style={commonStyles.caption}>{customer?.age}</Text>
            <Text style={commonStyles.caption}>{customer?.mobile}</Text>
          </View>
        </View>
        <Profilepicuploadmodel
          modalVisible={picmodalVisible}
          setModalVisible={setpicModalVisible}
          onSubmit={uploadprofilpicfun}
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
