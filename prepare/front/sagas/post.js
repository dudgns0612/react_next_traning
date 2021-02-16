import { all, fork, put, delay, takeLatest, throttle, call } from 'redux-saga/effects';
import * as PostActions from '../reducers/post';
import * as UserActions from '../reducers/user';
import postService from '../api/post';

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

// 포스트 등록
function* addPost(action) {
  try {
    const result = yield call(postService.addPostAPI, action.data);
    yield put({
      type: PostActions.ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: UserActions.ADD_POST_TO_ME,
      data: result.data.id,
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

// 댓글 등록
function* addComment(action) {
  try {
    const result = call(postService.addCommentAPI, action.data);
    yield put({
      type: PostActions.ADD_COMMENT_SUCCESS,
      data: result.data,
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
