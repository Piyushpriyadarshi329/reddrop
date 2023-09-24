import React, {useState, useEffect, useRef, useMemo} from 'react';
import {View, Modal, FlatList, TouchableOpacity} from 'react-native';
import {Text} from '@rneui/themed';
import {useGetLocation} from '../../../customhook/useGetLocation';
import {IModalMethods, useModalMethods} from '../../../utils/useModalMethods';
import useDebounce from '../../../utils/useDebounce';
import {Icon, Input} from '@rneui/themed';
import Color from '../../../asset/Color';
import {LocationDto} from '../../../types';
import {useDispatch} from 'react-redux';
import {updateuserdata} from '../../../redux/reducer/Authreducer';

const LocationModal = (p: {modalMethods: IModalMethods}) => {
  const searchRef = useRef<any>(null);
  const [value, setValue] = useState('');
  const searchedText = useDebounce(value);
  const {data: locationList} = useGetLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (p.modalMethods.isOpen) searchRef?.current?.focus();
  }, [p.modalMethods.isOpen]);
  const filteredLocations = useMemo(
    () =>
      searchedText
        ? locationList
            ?.filter(
              l =>
                l.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1,
            )
            .sort(
              (a, b) =>
                (a.name.toLowerCase().indexOf(searchedText.toLowerCase()) ??
                  0) -
                (b.name.toLowerCase().indexOf(searchedText.toLowerCase()) ?? 0),
            )
        : locationList,
    [searchedText, locationList],
  );
  const setLocation = (location: LocationDto) => {
    const cityName = locationList?.find(l => l.id == location.id)?.name;
    dispatch(
      updateuserdata({
        cityName: cityName,
      }),
    );
    p.modalMethods.close();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={p.modalMethods.isOpen}
      onRequestClose={p.modalMethods.close}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}>
        <View style={{alignSelf: 'flex-end'}} onTouchEnd={p.modalMethods.close}>
          <Icon name="close" size={24} color={Color.primary} />
        </View>
        <Input
          ref={(r: any) => {
            searchRef.current = r;
            r?.focus?.();
          }}
          onChangeText={(t: string) => setValue(t)}
          placeholder={'City'}
        />
        <View>
          <FlatList
            data={filteredLocations}
            contentContainerStyle={{gap: 5}}
            keyExtractor={i => i.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setLocation(item);
                }}
                style={{
                  padding: 2,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: Color.tertiary,
                  backgroundColor: Color.tertiary,
                }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;
