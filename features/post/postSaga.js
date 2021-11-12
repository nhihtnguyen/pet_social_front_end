import { call, take, put, all } from 'redux-saga/effects';
import { postActions as actions } from './postSlice';
import { getPosts } from './postAPI';

function* handleGetPosts() {
    try {
        let data = yield call(getPosts);
        yield put(actions.fetchSuccess(data));
    } catch (error) {
        yield put(actions.fetchFailure(error.message.toString()))
        console.log(error);
    }
};

function* watchFetchFlow() {
    while (true) {
        const action = yield take(actions.fetch.type);
        yield call(handleGetPosts);
    }
};

export default function* postSaga() {
    yield all([
        watchFetchFlow(),
    ])
};