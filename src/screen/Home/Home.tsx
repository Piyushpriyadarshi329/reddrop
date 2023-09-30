import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SearchBar, Skeleton, makeStyles} from '@rneui/themed';
import React, {useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {AppPages} from '../../appPages';
import Color from '../../asset/Color';
import {commonStyles} from '../../asset/styles';
import Clinic from '../../component/Clinic';
import Doctor from '../../component/Doctor';
import Specialty from './Specialty';
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
import GetLocation from 'react-native-get-location';
import {useReverseSearchCity} from './../../customhook/useReverseSearchCity';
import {updateuserdata} from '../../redux/reducer/Authreducer';

import {useDispatch} from 'react-redux';

// const bgc = '#dcedec';
const bgc = Color.primary;
const textColor = Color.white;

type Props = {
  fullWidth?: boolean;
};

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    background: theme.colors.white,
    width: props.fullWidth ? '100%' : 'auto',
  },
  text: {
    color: theme.colors.white,
  },
  heading: {
    fontSize: 18,
    color: Color.white,
  },
  searhBarContainer: {
    borderColor: undefined,
    borderWidth: undefined,
    backgroundColor: undefined,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    padding: 0,
  },
  sectionTitle: {
    color: theme.colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
}));

export default function Home() {
  const {username, userid, cityName} = useSelector(
    (root: RootState) => root.Appstate,
  );
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const styles = useStyles();
  const {mutate, isLoading} = useReverseSearchCity({
    onSuccess: (data: any) => {
      console.log('search city', data);
      dispatch(
        updateuserdata({
          cityName: data[0],
        }),
      );
    },
  });
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
  const {fontScale} = useWindowDimensions();

  const height = 50 * fontScale;
  const bottomContainerTopPaddding = height + 30;
  const {AnimatedScrollView, AnimatedView} = ScrollWP(height, 1);

  useEffect(() => {
    if (!cityName) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log('location', location);

          mutate({lat: location.latitude, lan: location.longitude});
        })
        .catch(error => {
          console.log('error', error);
          const {code, message} = error;
        });
    }
  }, []);

  return (
    <View style={{flex: 1, gap: 5, backgroundColor: bgc}}>
      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.justifyCenter,
          commonStyles.p10,
          {height: 50, zIndex: 20, backgroundColor: bgc},
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
          <Icon name="map-marker-alt" size={16} color={Color.white} />
          <Text style={{marginLeft: 10, color: Color.white}}>{cityName}</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Home</Text>
      </View>
      <AnimatedView>
        <View style={{backgroundColor: bgc, padding: 5}}>
          <View style={{paddingHorizontal: 10}}>
            <Text style={[commonStyles.font20, styles.text]}>
              Hello {username}👋
            </Text>
            <Text style={[commonStyles.caption, styles.text]}>
              How are you today ?
            </Text>
          </View>
          <Pressable
            style={{padding: 10, backgroundColor: bgc, marginTop: -2}}
            onPress={() => {
              navigation.navigate(AppPages.Search);
            }}>
            <SearchBar
              round
              lightTheme
              containerStyle={styles.searhBarContainer}
              placeholder="Search Doctors and Clinics"
              onFocus={() => {
                navigation.navigate(AppPages.Search);
              }}
              inputContainerStyle={{backgroundColor: 'white'}}
              disabled
            />
          </Pressable>
        </View>
      </AnimatedView>
      <AnimatedScrollView>
        <View
          style={{
            marginHorizontal: 10,
            gap: 10,
            paddingTop: bottomContainerTopPaddding,
          }}>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
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
                    <Text style={[commonStyles.caption, styles.text]}>
                      No Doctors Listed in the area yet.
                    </Text>
                  </View>
                }
              />
            )}
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={styles.sectionTitle}>Top Clinics</Text>
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
                    <Text style={[commonStyles.caption, styles.text]}>
                      No Clinics Listed in the area yet.
                    </Text>
                  </View>
                }
              />
            )}
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text style={[{textAlign: 'center'}, styles.sectionTitle]}>
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
                        style={{flex: 1, flexDirection: 'row', gap: 10}}
                        key={`speciality_row_${chunk[0].id}`}>
                        {chunk.map(item => (
                          <Specialty details={item} key={item.id} />
                        ))}
                      </View>
                    ),
                  )}
                  <View style={{height: 50}}></View>
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
