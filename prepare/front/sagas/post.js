import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import * as PostActions from '../reducers/post';
import * as UserActions from '../reducers/user';
import postService from '../api/post';

function* loadPost(action) {
  try {
    const result = yield call(postService.loadPostAPI, action.data);
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

function* loadPosts(action) {
  try {
    const result = yield call(postService.loadPostsAPI, action.data);
    yield put({
      type: PostActions.LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PostActions.LOAD_POSTS_FAILURE,
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

function* uploadImages(action) {
  try {
    const result = yield call(postService.uploadImagesAPI, action.data);
    yield put({
      type: PostActions.UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActions.UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* retweet(action) {
  try {
    const result = yield call(postService.retweetAPI, action.data);
    yield put({
      type: PostActions.RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PostActions.RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(PostActions.LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, PostActions.LOAD_POSTS_REQUEST, loadPosts);
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

function* watchUploadImages() {
  yield takeLatest(PostActions.UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(PostActions.RETWEET_REQUEST, retweet);
}

function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}

export default postSaga;
