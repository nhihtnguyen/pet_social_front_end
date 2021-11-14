import { call, take, put, all } from "redux-saga/effects";
import { postActions as actions } from "./postSlice";
import { editPostActions } from "./editPostSlice";
import { getPosts } from "./postAPI";

function* handleGetPosts() {
  try {
    let data = yield call(getPosts);
    yield put(actions.fetchSuccess(data));
  } catch (error) {
    yield put(actions.fetchFailure(error.message.toString()));
    console.log(error);
  }
}

function* watchFetchFlow() {
  while (true) {
    const action = yield take(actions.fetch.type);
    yield call(handleGetPosts);
  }
}
function* watchEditFlow() {
  while (true) {
    const action = yield take(editPostActions.fetch.type);
    yield call(handleUpload, action.payload);
  }
}
function* handleUpload(data) {
  try {
    //call api
    yield put(editPostActions.fetchSuccess());
  } catch (error) {
    yield put(editPostActions.fetchFailure(error.message.toString()));
    console.log(error);
  }
}
export default function* postSaga() {
  yield all([watchFetchFlow(), watchEditFlow()]);
}
