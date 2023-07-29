import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CustomerState {
  doctor: any;
}

const initialState: CustomerState = {
  doctor: null,
};

export const customerdata = createSlice({
  name: 'customerdata',
  initialState,
  reducers: {
    updatecustomerdata: (state, action: PayloadAction<any>) => {
      return {...state, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {updatecustomerdata} = customerdata.actions;

export default customerdata.reducer;
