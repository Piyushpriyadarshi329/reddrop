import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {useSelector, useDispatch} from 'react-redux';
import {updateuserdata} from './../redux/reducer/Authreducer';

export default function Profile() {
  const dispatch = useDispatch();

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 20}}>
        <View style={{flex: 2, marginTop: 30}}>
          <View>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              Piyush Priyadarshi
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', marginTop: 5}}>Heart Specialist</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>Shivaji nager, pune</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'black'}}>Maharastra, 400011</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
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
