import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
}

export const marketSlice = createSlice({
  name: 'market',
  initialState,

  reducers: {
    fetchItems: (state) => {
      state.isLoading = true;
      return state
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      return state;
    },
    fetchFailed: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMsg = action.payload;
      return state;
    },
    addItems: (state, action) => {
      //state = state.concat(action.payload);
      return state;
    },
  },

});

export const marketActions = marketSlice.actions;

export const marketSelector = (state) => state.market;

export default marketSlice.reducer;
