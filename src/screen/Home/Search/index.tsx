import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {SearchBar, Text} from '@rneui/themed';
import Navbar from '../../../component/Navbar';
import {homeStyles} from '../Home';
import useDebounce from '../../../utils/useDebounce';
import {useGetDoctorList} from '../../DoctorDetails/useDoctorQuery';
import DoctorListCard from '../DoctorList/DoctorListCard';

const Search = () => {
  const [value, setValue] = useState('');
  const searchedText = useDebounce(value);
  const searchBar = useRef<any>(null);
  useEffect(() => {
    searchBar?.current?.focus();
  }, []);
  const {data: doctors} = useGetDoctorList({});
  useEffect(() => {}, [searchedText]);

  return (
    <View>
      <Navbar title="Doctors" />
      <View>
        <SearchBar
          ref={(r: any) => (searchBar.current = r)}
          round
          lightTheme
          containerStyle={homeStyles.searhBarContainer}
          placeholder="Search Doctors and Clinics"
          value={value}
          onChangeText={setValue}
        />
        <View>
          <FlatList
            data={doctors}
            renderItem={({item}) => <DoctorListCard details={item} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;
