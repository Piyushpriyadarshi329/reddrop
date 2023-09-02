import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../asset/Color';
import {VisibleDocument} from '../types';
import ModalCloseOnEscape from '../utils/ModalCloseOnEscape';
import {useAddDocumentMutation} from '../customhook/useDocumentQuery';

export default function Profilepicuploadmodel({
  modalVisible,
  setModalVisible,
  onSubmit,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  onSubmit: (p: VisibleDocument | undefined) => void;
}) {
  const {mutate: addDocument} = useAddDocumentMutation({
    onSuccess: data => {
      onSubmit(data);
    },
  });
  function openfolder() {
    ImagePicker.openPicker({
      width: 600,
      height: 800,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      addDocument(image);
      setModalVisible(false);
    });
  }
  function opencamera() {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      addDocument(image);
      setModalVisible(false);
    });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalCloseOnEscape setVisible={setModalVisible} />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: 100,
            backgroundColor: Color.tertiary,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <View style={{marginTop: 10, flexDirection: 'row', flex: 1}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  opencamera();
                }}>
                <Entypo name="camera" size={40} color={Color.primary} />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  openfolder();
                }}>
                <Entypo name="folder" size={40} color={Color.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
