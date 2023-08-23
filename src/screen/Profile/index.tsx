import {useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {commonStyles} from '../../asset/styles';
import Profilepicuploadmodel from '../../component/Profilepicuploadmodel';
import {RootState} from '../../redux/Store';
import {VisibleDocument} from '../../types';
import {updateuserdata} from '../../redux/reducer/Authreducer';
import {useGetCustomer} from './useCustomerQuery';
import EditButton from '../../component/EditButton';

export default function Profile() {
  const dispatch = useDispatch();
  const Appstate = useSelector((state: RootState) => state.Appstate);
  const [picmodalVisible, setpicModalVisible] = useState(false); // profile pic
  const {data: customer} = useGetCustomer(Appstate.userid);
  function uploadprofilpicfun(data: VisibleDocument | undefined) {
    // updateCustomer({
    //   profile_image_key: data?.fileKey,
    // });
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
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
        <View style={{padding: 20, gap: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[commonStyles.font24, commonStyles.weight600]}>
              {Appstate.username}
            </Text>
            <EditButton onPress={() => {}} />
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

        <TouchableOpacity
          onPress={() => {
            setpicModalVisible(true);
          }}>
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
        </TouchableOpacity>
      </View>
      <View style={{flex: 4}}></View>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Button
            color={'red'}
            title="Log out"
            onPress={() => {
              dispatch(
                updateuserdata({
                  islogin: false,
                }),
              );
            }}></Button>
        </View>
      </View>
    </View>
  );
}
