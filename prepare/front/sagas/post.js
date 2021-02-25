import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import * as PostActions from '../reducers/post';
import * as UserActions from '../reducers/user';
import postService from '../api/post';
import postsService from '../api/posts';

function* loadPost(action) {
  try {
    const result = yield call(postsService.loadPostsAPI, action.data);
    yield put({
      type: PostActions.LOAD_POST_SUCCESS,
      data: result.data,
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
    const result = yield call(postService.removePostAPI, action.data);
    yield put({
      type: PostActions.REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: UserActions.REMOVE_POST_TO_ME,
      data: result.data,
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
    const result = yield call(postService.addCommentAPI, action.data);
    yield put({
      type: PostActions.ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActions.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* likePost(action) {
  try {
    const result = yield call(postService.likePostAPI, action.data);
    yield put({
      type: PostActions.LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActions.LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* unlikePost(action) {
  try {
    const result = yield call(postService.unlikePostAPI, action.data);
    yield put({
      type: PostActions.UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActions.UNLIKE_POST_FAILURE,
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

function* watchLikePost() {
  yield takeLatest(PostActions.LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(PostActions.UNLIKE_POST_REQUEST, unlikePost);
}

function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}

export default postSaga;
