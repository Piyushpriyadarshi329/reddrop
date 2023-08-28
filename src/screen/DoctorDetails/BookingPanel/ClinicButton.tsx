import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import openMap from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../../asset/Color';
import Address from '../../../component/Address';
import {ClinicWithAddressAndImage} from '../../../types';
import ShadowWrapper, {shadowStyles} from '../../../component/ShadowWrapper';

const ClinicButton = ({
  clinic,
  selectedClinic,
  setSelectedClinic,
}: {
  clinic: ClinicWithAddressAndImage;
  selectedClinic: ClinicWithAddressAndImage | undefined;
  setSelectedClinic: (p: ClinicWithAddressAndImage) => void;
}) => {
  return (
    <ShadowWrapper containerStyle={shadowStyles.flexMargin}>
      <View
        key={clinic.id}
        style={{
          borderRadius: 10,
          height: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedClinic?.clinic_doctor_id == clinic.clinic_doctor_id
                ? Color.primary
                : Color.secondary,
            borderRadius: 10,
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setSelectedClinic(clinic);
          }}>
          <Text style={{textAlign: 'center'}}>{clinic.name}</Text>
          <Address details={clinic.address} compact={true} />
        </TouchableOpacity>
        {true && (
          <TouchableOpacity
            style={{
              right: 0,
              position: 'absolute',
              top: 0,
              height: '100%',
            }}
            onPress={() =>
              openMap({
                latitude: clinic.address.lat,
                longitude: clinic.address.lan,
              })
            }>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                height: '100%',
              }}>
              <Icon name="navigate" size={20} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ShadowWrapper>
  );
};

export default ClinicButton;
