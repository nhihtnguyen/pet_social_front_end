import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    errorMsg: undefined,
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchAll(state) {
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
        changeStatus(state, action) {
            state.data = state.data.map((todo, index) => index !== action.payload
                ? todo
                : { ...todo, status: todo.status === 'planned' ? 'done' : 'planned' }
            )
        }
    }
});

export const todoActions = todoSlice.actions;
export const todoSelector = (state) => state.todo;
export default todoSlice.reducer;