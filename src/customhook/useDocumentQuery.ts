import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {useAlert} from '../utils/useShowAlert';
import {AddDocumentResponse, VisibleDocument} from '../types';
import {DOCUMENT} from '../API_CONFIG';
import mime from 'mime';

const FormData = require('form-data');

export const useAddDocumentMutation = (props?: {
  onSuccess?: (data: VisibleDocument | undefined) => void;
}) => {
  const {axiosAlert} = useAlert();
  return useMutation(
    async (image: ImageOrVideo) => {
      if (image.path) {
        let localUri = image.path;
        const newImageUri = 'file:///' + image.path.split('file:/').join('');
        const form = new FormData();
        form.append('file', {
          uri: localUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split('/').pop(),
        });
        return axios.post<AddDocumentResponse>(DOCUMENT, form, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
      }
    },
    {
      onSuccess: data => {
        props?.onSuccess?.(data?.data.data);
      },
      onError: e => {
        axiosAlert(e);
      },
    },
  );
};
