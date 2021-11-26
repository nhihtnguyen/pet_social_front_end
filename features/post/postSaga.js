import { call, take, put, all } from "redux-saga/effects";
import { postActions as actions } from "./postSlice";
import { editPostActions } from "./editPostSlice";
import { getPosts, createPost } from "./postAPI";

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
}
function* watchEditFlow() {
  while (true) {
    const action = yield take(editPostActions.fetch.type);
    console.log('hello', action.payload);
    yield call(handleUpload, action.payload.data);
  }
}
function* handleUpload(data) {
  try {
    const rel = yield call(createPost, data)
    yield put(editPostActions.fetchSuccess());
  } catch (error) {
    yield put(editPostActions.fetchFailure(error.message.toString()));
    console.log(error);
  }
}
export default function* postSaga() {
  yield all([
    watchFetchFlow(),
  ])
};