import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  errorMsg: undefined,
  isSuccess: false,
};

export const editPostSlice = createSlice({
  name: 'edit_post',
  initialState,
  reducers: {
    create(state, action) {
      state.isLoading = true;
    },
    update(state, action) {
      state.data = state.data.concat(action.payload);
    },
    delete(state, action) {
      state = state.data.filter((todo) => index !== action.payload);
    },
    fetchSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchFailure(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = action.payload;
    }
  },
});

export const editPostActions = editPostSlice.actions;
export const editPostSelector = (state) => state.edit_post;
export default editPostSlice.reducer;
