import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Doctor from '../component/Doctor';
import Color from '../asset/Color';

export default function Doctorlistcategorywise() {
  // Allergy and immunology
  // Anesthesiology
  // Dermatology
  // Diagnostic radiology

  // Emergency medicine
  // Family medicine
  // Internal medicine
  // Medical genetics
  // Neurology
  // Nuclear medicine

  // Obstetrics and gynecology
  // Ophthalmology
  // Pathology
  // Pediatrics
  // Physical medicine and rehabilitation
  // Preventive medicine
  // Psychiatry
  // Radiation oncology
  // Surgery
  // Urology

  const [category, setcategory] = useState([
    {
      descn: 'Allergy and immunology',
      valule: 1,
    },
    {
      descn: 'Anesthesiology',
      valule: 2,
    },
    {
      descn: 'Dermatology',
      valule: 3,
    },
    {
      descn: 'Diagnostic radiology',
      valule: 4,
    },
    {
      descn: 'Emergency medicine',
      valule: 5,
    },
    {
      descn: 'Medical genetic',
      valule: 8,
    },
    {
      descn: 'Neurology',
      valule: 9,
    },
    {
      descn: 'Nuclear medicine',
      valule: 10,
    },
    {
      descn: 'Physical medicine and rehabilitationy',
      valule: 11,
    },
    {
      descn: 'Pathology',
      valule: 12,
    },
    {
      descn: 'Pediatrics',
      valule: 13,
    },
    {
      descn: 'Allergy and immunology',
      valule: 14,
    },
    {
      descn: 'Anesthesiology',
      valule: 15,
    },
    {
      descn: 'Dermatology',
      valule: 16,
    },
    {
      descn: 'Allergy and immunology',
      valule: 17,
    },
    {
      descn: 'Anesthesiology',
      valule: 18,
    },
    {
      descn: 'Preventive medicine',
      valule: 19,
    },
    {
      descn: 'Urology',
      valule: 20,
    },
  ]);

  const [doctors, setdoctors] = useState([
    {
      active: 1,
      clinic_id: '566fbaf6-7c2c-4cf6-9fc4-e0d038abcce3',
      doctor_id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      email: 'doc@gmail.com',
      id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      mobile: '8217084948',
      name: 'piyush priyadarshi',
      password: '123',
      profile_image_key: null,
    },
    {
      active: 1,
      clinic_id: '566fbaf6-7c2c-4cf6-9fc4-e0d038abcce3',
      doctor_id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      email: 'doc@gmail.com',
      id: '6d5be353-491c-4cfb-84e0-d7da2d65da1e',
      mobile: '8217084948',
      name: 'piyush priyadarshi',
      password: '123',
      profile_image_key: null,
    },
  ]);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.primary,
        }}>
        <Text style={{fontWeight: '700', fontSize: 16, color: 'black'}}>
          Find Doctors
        </Text>
      </View>

      <View
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 20,
        }}>
        <TextInput
          style={{
            borderWidth: 0.2,
            width: '100%',
            borderRadius: 20,
            textAlign: 'center',
            height: 35,
            color: 'black',
          }}
          placeholder="Search Doctors"></TextInput>
      </View>

      <View style={{flex: 12, marginHorizontal: 10, marginTop: 10}}>
        <ScrollView>
          {category.map(i => {
            return (
              <View>
                <Text style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                  {i.descn}
                </Text>

                <ScrollView horizontal={true}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    {doctors.map(i => {
                      return <Doctor data={i} />;
                    })}
                  </View>
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
