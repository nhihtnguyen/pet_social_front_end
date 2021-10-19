import { all } from 'redux-saga/effects'
import todoSaga from '../features/todo/todoSaga';

function* rootSaga() {
    yield all([
        todoSaga(),
    ])
}

export default rootSaga;