import { all, fork, put, delay, takeLatest, throttle } from 'redux-saga/effects';
import shortId from 'shortid';
import * as PostActions from '../reducers/post';
import * as UserActions from '../reducers/user';

function addPostAPI() {
  return; //axios.~
}

function* loadPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: PostActions.LOAD_POST_SUCCESS,
      data: PostActions.generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: PostActions.LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addPost(action) {
  const id = shortId.generate();
  try {
    yield delay(1000);
    yield put({
      type: PostActions.ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: UserActions.ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: PostActions.ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: PostActions.REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: UserActions.REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: PostActions.REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: PostActions.ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: PostActions.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield throttle(5000, PostActions.LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(PostActions.ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(PostActions.REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(PostActions.ADD_COMMENT_REQUEST, addComment);
}

function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ]);
}

export default postSaga;
