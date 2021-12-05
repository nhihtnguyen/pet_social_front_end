import { all } from 'redux-saga/effects';
import postSaga from 'features/post/postSaga';
import todoSaga from 'features/todo/todoSaga';
import marketSaga from 'features/market/marketSaga';

function* rootSaga() {
  yield all([todoSaga(), marketSaga()]);
}

export default rootSaga;
