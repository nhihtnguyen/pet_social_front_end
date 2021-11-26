import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: undefined,
  isSuccess: false,
};

export const editPostSlice = createSlice({
  name: "edit_post",
  initialState,
  reducers: {
    fetch(state, action) {
      state.isLoading = true;
    },
    fetchSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
    },
    fetchFailure(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = action.payload;
    },
  },
});

export const editPostActions = editPostSlice.actions;
export const editPostSelector = (state) => state.edit_post;
export default editPostSlice.reducer;
