import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  isFailed: false,
  errorMsg: undefined,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getAll(state, action) {
      state.isLoading = true;
    },
    getOne(state, action) {
      state.isLoading = true;
    },
    fetchSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchFailed(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export const postSelector = (state) => state.post;
export default postSlice.reducer;
