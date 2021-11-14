import { all } from 'redux-saga/effects'
import postSaga from '../features/post/postSaga';
import todoSaga from '../features/todo/todoSaga';

function* rootSaga() {
    yield all([
        todoSaga(),
        postSaga(),
    ])
}

export default rootSaga;