import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import editPostReducer from '../features/post/editPostSlice';
import marketReducer from '../features/market/marketSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    post: postReducer,
    edit_post: editPostReducer,
    market: marketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
