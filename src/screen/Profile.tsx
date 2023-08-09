import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../asset/Color';
import {useAddaddress} from '../customhook/useAddaddress';
import {useGetaddress} from '../customhook/useGetaddress';
import {RootState} from '../redux/Store';
import {updateuserdata} from './../redux/reducer/Authreducer';
import {Button} from 'react-native';

export default function Profile() {
  const dispatch = useDispatch();
  const {Appstate, customerdata} = useSelector((state: RootState) => state);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [addressline1, setaddressline1] = useState('');
  const [addressline2, setaddressline2] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getaddress();
  }, []);

  async function getaddress() {
    try {
      let payload = {
        user_id: Appstate.userid,
      };

      console.log('payload', payload);
      let getaddressres: any = await useGetaddress(payload);

      console.log('getaddressres', getaddressres.data.data[0]);

      setaddressline1(getaddressres.data.data[0].address_line1);
      setaddressline2(getaddressres.data.data[0].address_line2);
      setcity(getaddressres.data.data[0].city);
      setstate(getaddressres.data.data[0].state);
      setpincode(getaddressres.data.data[0].pincode);
    } catch (error) {
      console.log(error);
    }
  }

  async function submithandler() {
    try {
      let payload = {
        user_id: Appstate.userid,
        address_line1: addressline1,
        address_line2: addressline2,
        city: city,
        state: state,
        pincode: pincode,
        lat: '0',
        lan: '0',
      };

      let res: any = await useAddaddress(payload);

      console.log('res', res.data);
      setModalVisible(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            marginTop: 200,
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
          }}>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Fill address details</Text>
          </View>
          <View style={{flex: 3, marginHorizontal: 30}}>
            <View style={{flex: 1}}>
              <TextInput
                value={addressline1}
                style={{borderBottomWidth: 1}}
                placeholder={'Please enter address line1'}
                onChangeText={e => {
                  setaddressline1(e);
                }}></TextInput>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={addressline2}
                style={{borderBottomWidth: 1, color: 'black'}}
                placeholder={'Please enter address line2'}
                onChangeText={e => {
                  setaddressline2(e);
                }}></TextInput>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={city}
                style={{borderBottomWidth: 1, color: 'black'}}
                placeholder={'Please enter city'}
                onChangeText={e => {
                  setcity(e);
                }}></TextInput>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={state}
                style={{borderBottomWidth: 1, color: 'black'}}
                placeholder={'Please enter state'}
                onChangeText={e => {
                  setstate(e);
                }}></TextInput>
            </View>
            <View style={{flex: 1}}>
              <TextInput
                value={pincode}
                maxLength={6}
                keyboardType="numeric"
                style={{borderBottomWidth: 1, color: 'black'}}
                placeholder={'Please enter pincode'}
                onChangeText={e => {
                  setpincode(e);
                }}></TextInput>
            </View>
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: Color.primary}}
              onPress={submithandler}>
              <Text style={{fontSize: 16, color: 'black', padding: 5}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 2, marginTop: 30}}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              {Appstate.username}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: 'black'}}>
                  {addressline1} {addressline2}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: 'black'}}>
                  {city} {state}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: 'black'}}> {pincode}</Text>
              </View>
            </View>

            <View style={{marginLeft: 20, marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Icon name="edit" size={30} color={Color.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'center', flex: 1}}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginTop: 10,
            }}
            source={require('./../asset/image/profile.png')}
          />
        </View>
      </View>

      <View style={{flexDirection: 'column', flex: 8}}>
        <View style={{flex: textShown ? 2.5 : 1.5, marginHorizontal: 20}}>
          <View></View>
        </View>
        <View style={{flex: textShown ? 5 : 6, marginHorizontal: 20}}>
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
    </View>
  );
}
