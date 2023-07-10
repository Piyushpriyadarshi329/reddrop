import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
// import Icon from 'react-native-vector-icons/dist/Entypo';
import Icon from 'react-native-vector-icons/dist/Fontisto';

import {useNavigation} from '@react-navigation/native';

export default function BookApointment() {
  const navigation = useNavigation();

  const [selecteddate, setselecteddate] = useState('');
  const [selectedtime, setselectedtime] = useState('');

  const [timeslot, settimeslot] = useState([
    '08:00AM',
    '09:00AM',
    '10:00AM',
    '11:00AM',

    '12:00AM',
    '01:00PM',
    '02:00PM',
    '03:00PM',

    '04:00PM',
    '05:00PM',
    '05:00PM',
    '07:00PM',
  ]);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 1, marginTop: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '800',
            textAlign: 'center',
          }}>
          Doctor Detail
        </Text>
      </View>
      <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 10}}>
        <View style={{flex: 1.5}}>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: 150,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require('./../asset/image/doctor.webp')}
          />
        </View>

        <View style={{flex: 2}}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '700',
            }}>
            Dr.Mohit Sarma
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontWeight: '600',
            }}>
           Diagnostic radiology
          </Text>
          <View style={{flexDirection:"row",marginTop:5}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginTop:3,
                marginRight:5
              }}>
              4.8
            </Text>
            <Icon name="star" size={20} color="black" />
          </View>
          <View style={{flexDirection:"row",marginTop:5}}>
          <Icon name="map-marker-alt" size={20} color="black" />

            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginTop:3,
                marginRight:5
              }}>
              1.5 KM Away
            </Text>
          </View>
        </View>
      </View>

      <View style={{flex: 2, marginTop: 15, marginHorizontal: 20}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
            fontSize: 16,
            fontWeight: '800',
          }}>
          About
        </Text>
        <Text
          style={{
            color: 'black',
            textAlign: 'left',
            fontSize: 14,
            fontWeight: 'normal',
          }}>
          Becoming a doctor is an enormous commitment because it takes years of
          dedicated studying and clinical preparation before you can practise as
          a doctor.
        </Text>
      </View>

      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
        {[1, 2, 3, 4, 5, 6, 7].map(i => {
          return (
            <Pressable
              style={{flex: 1}}
              onPress={() => {
                setselecteddate(i);
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 5,
                  backgroundColor: selecteddate == i ? '#B5F1CC' : 'white',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  {i}
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
                  July
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: 'column',
          marginTop: 20,
          marginHorizontal: 20,
        }}>
        <FlatList
          data={timeslot}
          renderItem={item => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 1,
                  marginTop: 10,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor:
                    selectedtime == item.item ? '#B5F1CC' : 'white',
                }}
                onPress={() => {
                  setselectedtime(item.item);
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 16,
                      padding: 5,
                    }}>
                    {item.item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={4}
        />
      </View>
      <View style={{flex: 2}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#B5F1CC',
            marginHorizontal: 80,
          }}
          onPress={() => {
            navigation.navigate('Payment');
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
              padding: 5,
            }}>
            Book Apointment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
