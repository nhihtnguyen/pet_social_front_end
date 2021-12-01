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
        fetch(state, action) {
            state.isLoading = true;
        },
        fetchSuccess(state, action) {
            state.data = action.payload;
            state.isLoading = false;
        },
        fetchFailure(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.errorMsg = action.payload;
        },
        addOne(state, action) {
            state.data = state.data.concat(action.payload);
        },
        deleteOne(state, action) {
            state = state.data.filter(todo => index !== action.payload)
        },

    }
});

export const postActions = postSlice.actions;
export const postSelector = (state) => state.post;
export default postSlice.reducer;