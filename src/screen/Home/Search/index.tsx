import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {SearchBar, Text} from '@rneui/themed';
import Navbar from '../../../component/Navbar';
import {homeStyles} from '../Home';
import useDebounce from '../../../utils/useDebounce';
import {
  useGetDoctorList,
  useSearchDoctorList,
} from '../../DoctorDetails/useDoctorQuery';
import DoctorListCard from '../DoctorList/DoctorListCard';
import {Pallet3} from '../../../asset/Color';

const Search = () => {
  const [value, setValue] = useState('');
  const searchedText = useDebounce(value);
  const searchBar = useRef<any>(null);
  useEffect(() => {
    searchBar?.current?.focus();
  }, []);
  const {data: doctors} = useSearchDoctorList({
    name: searchedText,
  });

  return (
    <View>
      <Navbar title="Doctors" />
      <View
        style={{
          marginTop: -20,
          paddingTop: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: Pallet3.primary,
          paddingBottom: 10,
        }}>
        <SearchBar
          ref={(r: any) => (searchBar.current = r)}
          round
          lightTheme
          containerStyle={{
            backgroundColor: Pallet3.primary,
            borderColor: Pallet3.primary,
          }}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="Search Doctors and Clinics"
          value={value}
          onChangeText={setValue}
        />
      </View>
      <FlatList
        data={doctors}
        keyExtractor={item => item.id}
        renderItem={({item}) => <DoctorListCard details={item} />}
      />
    </View>
  );
};

export default Search;
