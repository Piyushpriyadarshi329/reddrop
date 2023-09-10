import {SearchBar} from '@rneui/themed';
import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableNativeFeedback,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import Clinic from '../../component/Clinic';
import Doctor from '../../component/Doctor';
import Speciality from '../../component/Speciality';
import {useGetLocation} from '../../customhook/useGetLocation';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetSpeciality} from '../../customhook/usegetSpeciality';
import {RootState} from '../../redux/Store';
import {SpecialityDto} from '../../types';
import {sliceIntoChunks} from '../../utils/jsMethods';
import {useGetDoctorList} from '../DoctorDetails/useDoctorQuery';
import Search from './Search';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppPages} from '../../appPages';
import {TouchableRipple} from 'react-native-paper';
import {useModalMethods} from '../../utils/useModalMethods';
import LocationModal from './LocationSelect';

export default function Home() {
  const {username, userid, cityName} = useSelector(
    (root: RootState) => root.Appstate,
  );
  const navigation = useNavigation<NavigationProp<any>>();
  const {data: topdoctorlist, dataUpdatedAt} = useGetDoctorList({
    orderBy: 'BOOKINGS',
  });
  const {data: topcliniclist} = useGetcliniclist({});
  const {data: Specialitylist} = usegetSpeciality();
  const locatinModalMethods = useModalMethods();

  return (
    <View style={{flex: 1, marginHorizontal: 10, gap: 10}}>
      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.justifyCenter,
          commonStyles.p10,
        ]}>
        <TouchableOpacity
          onPress={locatinModalMethods.open}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            padding: 10,
            alignItems: 'center',
          }}>
          <Icon name="map-marker-alt" size={16} color={Color.primary} />
          <Text style={{marginLeft: 10, color: Color.primary}}>{cityName}</Text>
        </TouchableOpacity>
        <Text style={commonStyles.font18}>Home</Text>
      </View>
      <View style={{gap: 15}}>
        <View>
          <Text style={commonStyles.font20}>Hello {username}👋</Text>
          <Text style={commonStyles.caption}>How are you today ?</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate(AppPages.Search);
          }}>
          <SearchBar
            round
            lightTheme
            containerStyle={homeStyles.searhBarContainer}
            placeholder="Search Doctors and Clinics"
            onFocus={() => {
              navigation.navigate(AppPages.Search);
            }}
            disabled
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{gap: 10}}>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            Top Doctors
          </Text>
          <FlatList
            contentContainerStyle={{gap: 10, height: '100%'}}
            horizontal={true}
            data={topdoctorlist}
            key={dataUpdatedAt}
            renderItem={({item, index}) => {
              console.log(item.id, index);
              return <Doctor details={item} key={item.id} />;
            }}
            keyExtractor={c => c.id}
            ListEmptyComponent={
              <View>
                <Text style={commonStyles.caption}>
                  No Doctors Listed in the area yet.
                </Text>
              </View>
            }
          />
        </View>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight600]}>
            Top Clinics
          </Text>
          <FlatList
            contentContainerStyle={{gap: 10, height: '100%'}}
            horizontal={true}
            data={topcliniclist}
            renderItem={({item}) => <Clinic details={item} key={item.id} />}
            keyExtractor={c => c.id}
            ListEmptyComponent={
              <View>
                <Text style={commonStyles.caption}>
                  No Clinics Listed in the area yet.
                </Text>
              </View>
            }
          />
        </View>
        <View style={{flexDirection: 'column', gap: 5}}>
          <Text style={[commonStyles.font16, commonStyles.weight400]}>
            Select from a category
          </Text>
          <View style={{gap: 10}}>
            {sliceIntoChunks(Specialitylist?.data, 3)?.map(
              (chunk: SpecialityDto[]) => (
                <View
                  style={{flex: 1, flexDirection: 'row', gap: 10}}
                  key={`speciality_row_${chunk[0].id}`}>
                  {chunk.map(item => (
                    <Speciality details={item} key={item.id} />
                  ))}
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView>
      <LocationModal modalMethods={locatinModalMethods} />
    </View>
  );
}

export const homeStyles = StyleSheet.create({
  searhBarContainer: {
    borderColor: undefined,
    borderWidth: undefined,
    backgroundColor: undefined,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    padding: 0,
  },
});
