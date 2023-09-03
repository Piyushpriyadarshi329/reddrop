import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CounterState {
  userid: string;
  islogin: boolean;
  username: string;
  cityName: string;
}

const initialState: CounterState = {
  userid: '',
  islogin: false,
  username: '',
  cityName: '',
};

export const Appstate = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    updateuserdata: (state, action: PayloadAction<any>) => {
      AsyncStorage.setItem(
        'userdata',
        JSON.stringify({...state, ...action.payload}),
      );
      return {...state, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateuserdata} = Appstate.actions;

export default Appstate.reducer;
