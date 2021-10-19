import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
