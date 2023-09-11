import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SearchBar, Skeleton} from '@rneui/themed';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {AppPages} from '../../appPages';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import Clinic from '../../component/Clinic';
import Doctor from '../../component/Doctor';
import Speciality from '../../component/Speciality';
import {useGetcliniclist} from '../../customhook/useGetcliniclist';
import {usegetSpeciality} from '../../customhook/usegetSpeciality';
import {RootState} from '../../redux/Store';
import {SpecialityDto} from '../../types';
import {sliceIntoChunks} from '../../utils/jsMethods';
import {useModalMethods} from '../../utils/useModalMethods';
import {useGetDoctorList} from '../DoctorDetails/useDoctorQuery';
import LocationModal from './LocationSelect';
import {useScrollAnimation} from './ScrollAnimation';
import {ScrollWP} from './ScrollWP';

export default function Home() {
  const {username, userid, cityName} = useSelector(
    (root: RootState) => root.Appstate,
  );
  const navigation = useNavigation<NavigationProp<any>>();
  const {
    data: topdoctorlist,
    dataUpdatedAt,
    isLoading: isDoctorsLoading,
  } = useGetDoctorList({
    orderBy: 'BOOKINGS',
  });
  const {data: topcliniclist, isLoading: isClinicsLoading} = useGetcliniclist(
    {},
  );
  const {data: Specialitylist, isLoading: isSpecialitiesLoading} =
    usegetSpeciality();
  const locatinModalMethods = useModalMethods();
  // const {AnimatedScrollView, AnimatedView: AnimatedView} = useScrollAnimation(50);
  const height = 50 * 2;
  const {AnimatedScrollView, AnimatedView} = ScrollWP(height, 0.6);
  return (
    <View style={{flex: 1, gap: 5}}>
      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.justifyCenter,
          commonStyles.p10,
          {zIndex: 20, backgroundColor: 'white'},
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
      <AnimatedView>
        <View style={{height: height, backgroundColor: 'white'}}>
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
      </AnimatedView>
      <AnimatedScrollView>
        <View style={{marginHorizontal: 10, gap: 10, paddingTop: 20}}>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={[commonStyles.font16, commonStyles.weight600]}>
              Top Doctors
            </Text>
            {isDoctorsLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <Skeleton animation="pulse" width={100} height={100} />
                <Skeleton animation="pulse" width={100} height={100} />
                <Skeleton animation="pulse" width={100} height={100} />
              </View>
            ) : (
              <FlatList
                contentContainerStyle={{gap: 10, height: '100%'}}
                horizontal={true}
                data={topdoctorlist}
                key={dataUpdatedAt}
                renderItem={({item}) => <Doctor details={item} key={item.id} />}
                keyExtractor={c => c.id}
                ListEmptyComponent={
                  <View>
                    <Text style={commonStyles.caption}>
                      No Doctors Listed in the area yet.
                    </Text>
                  </View>
                }
              />
            )}
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={[commonStyles.font16, commonStyles.weight600]}>
              Top Clinics
            </Text>
            {isClinicsLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <Skeleton animation="pulse" width={100} height={100} />
                <Skeleton animation="pulse" width={100} height={100} />
                <Skeleton animation="pulse" width={100} height={100} />
              </View>
            ) : (
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
            )}
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={[commonStyles.font16, commonStyles.weight400]}>
              Select from a category
            </Text>
            <View style={{gap: 10, paddingHorizontal: 30}}>
              {isSpecialitiesLoading ? (
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Skeleton animation="pulse" width={100} height={100} />
                  <Skeleton animation="pulse" width={100} height={100} />
                  <Skeleton animation="pulse" width={100} height={100} />
                </View>
              ) : (
                <>
                  {sliceIntoChunks(Specialitylist?.data, 3)?.map(
                    (chunk: SpecialityDto[]) => (
                      <View
                        style={{flex: 1, flexDirection: 'row', gap: 30}}
                        key={`speciality_row_${chunk[0].id}`}>
                        {chunk.map(item => (
                          <Speciality details={item} key={item.id} />
                        ))}
                      </View>
                    ),
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </AnimatedScrollView>
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
