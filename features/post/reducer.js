import { createReducer } from '@reduxjs/toolkit';
import {
  getAll,
  getAllSuccess,
  getAllError,
  getOne,
  getOneSuccess,
  getOneError,
  create,
  createSuccess,
  createError,
  update,
  updateSuccess,
  updateError,
} from './actions';

const initialState = {
  isLoading: false,
  data: [],
  errorMsg: undefined,
  isSuccess: false,

};

export const postReducer = createReducer(initialState, (builder) => {
  builder
    // Get All 
    .addCase(getAll, (state) => {
       state.isLoading = true;
    })
    .addCase(getAllError, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = action.payload;
      state.data = [];
    })
    .addCase(getAllSuccess, (state, action) => {
    state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
      state.errorMsg = undefined;
    })
    // Get One
    .addCase(getOne, (state) => {
       state.isLoading = true;
    })
    .addCase(getOneError, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = action.payload;
    })
    .addCase(getOneSuccess, (state, action) => {
      // state.data = [action.payload];
      state.isLoading = false;
      state.isSuccess = true;
    })
    // Create new
    .addCase(create, (state) => {
       state.isLoading = true;
    })
    .addCase(createError, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = action.payload;
    })
    .addCase(createSuccess, (state, action) => {
      state.data = [action.payload];
      state.isLoading = false;
      state.isSuccess = true;
    })
    // Update
    .addCase(update, (state) => {
       state.isLoading = true;
    })
    .addCase(updateError, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMsg = action.payload;
    })
    .addCase(updateSuccess, (state, action) => {
      state.data = [action.payload];
      state.isLoading = false;
      state.isSuccess = true;
    });
});
