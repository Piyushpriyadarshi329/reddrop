import {useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
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
        <Profilepicuploadmodel
          modalVisible={picmodalVisible}
          setModalVisible={setpicModalVisible}
          onSubmit={uploadprofilpicfun}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 2, padding: 20}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View style={{flex: 3}}>
                <Text style={[commonStyles.font24, commonStyles.weight600]}>
                  {Appstate.username}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <EditButton onPress={() => {}} />
              </View>
            </View>
            <View style={{gap: 5}}>
              <Text style={[commonStyles.font20, commonStyles.weight400]}>
                Gender: {customer?.gender}
              </Text>
              <Text style={[commonStyles.font20, commonStyles.weight400]}>
                Age: {customer?.age}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Image
              style={commonStyles.profileImage}
              source={
                customer?.profile_image
                  ? {
                      uri: customer.profile_image,
                    }
                  : require('../../asset/image/profile.png')
              }
            />
          </View>
        </View>
      </View>
    </MenuProvider>
  );
}
