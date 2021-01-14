import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';

function addPostAPI() {
  return; //axios.~
}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: 'ADD_POST_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

function* postSaga() {
  yield all([fork(watchAddPost)]);
}

export default postSaga;
