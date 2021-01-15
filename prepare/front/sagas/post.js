import { all, fork, put, delay, takeLatest } from 'redux-saga/effects';
import * as PostActions from '../reducers/post';

function addPostAPI() {
  return; //axios.~
}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: PostActions.ADD_POST_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: PostActions.ADD_POST_FAILURE,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: PostActions.ADD_COMMENT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: PostActions.ADD_COMMENT_FAILURE,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(PostActions.ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(PostActions.ADD_COMMENT_REQUEST, addComment);
}

function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}

export default postSaga;
