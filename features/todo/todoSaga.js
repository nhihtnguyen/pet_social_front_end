import { call, take, put, all } from 'redux-saga/effects';
import { todoActions as actions } from './todoSlice';

const temp = [
    {
        name: 'first work',
        status: 'planned'
    },
    {
        name: 'first work kkkkkkkkkkkkkkkk',
        status: 'done'
    }
]
function* handleGetAll() {
    try {
        let data = temp//yield call(); // Call api here!
        yield put(actions.fetchSuccess(data));
    } catch (error) {
        yield put(actions.fetchFailure(error.message.toString()))
        console.log(error);
    }
};

function* watchFetchFlow() {
    while (true) {
        const action = yield take(actions.fetchAll.type);
        yield call(handleGetAll);
    }
};

function* handleDeleteOne() {

};

function* handleAddOne() {

};

export default function* todoSaga() {
    yield all([
        watchFetchFlow(),
    ])
};