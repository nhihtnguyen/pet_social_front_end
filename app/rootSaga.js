import { all } from 'redux-saga/effects';
import postSaga from 'features/post/postSaga';
import marketSaga from 'features/market/marketSaga';

function* rootSaga() {
  yield all([marketSaga()]);
}

export default rootSaga;
