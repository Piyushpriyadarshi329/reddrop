import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  userid: number | null;
  islogin: boolean;
}

const initialState: CounterState = {
  userid: null,
  islogin: false,
};

export const counterSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    updateuserdata: (state, action: PayloadAction<any>) => {
      return {...state, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateuserdata} = counterSlice.actions;

export default counterSlice.reducer;
