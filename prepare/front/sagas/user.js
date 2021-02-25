import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import * as UserAction from '../reducers/user';
import userService from '../api/user';

function* logIn(action) {
  try {
    const result = yield call(userService.logInAPI, action.data);
    yield put({ type: UserAction.LOG_IN_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: UserAction.LOG_IN_FAILURE, error: err.response.data });
  }
}

function* logOut() {
  try {
    yield call(userService.logOutAPI);
    yield delay(1000);
    yield put({ type: UserAction.LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: UserAction.LOG_OUT_FAILURE, error: err.response.data });
  }
}

function* singUp(action) {
  try {
    yield call(userService.singUpAPI, action.data);
    yield put({
      type: UserAction.SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: UserAction.SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadMyInfo() {
  try {
    const result = yield call(userService.loadUerAPI);
    yield put({
      type: UserAction.LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저 팔로우
function* follow(action) {
  try {
    const result = yield call(userService.followAPI, action.data);
    yield put({
      type: UserAction.FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저 언팔로우
function* unFollow(action) {
  try {
    const result = yield call(userService.unfollowAPI, action.data);
    yield put({
      type: UserAction.UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// 유저 언팔로우
function* removeFollower(action) {
  try {
    const result = yield call(userService.removeFollowerAPI, action.data);
    yield put({
      type: UserAction.REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

// 닉네임 변경
function* changeNickname(action) {
  try {
    const result = yield call(userService.changeUserNicknameAPI, action.data);
    yield put({
      type: UserAction.CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로워 조회
function* loadFollowers() {
  try {
    const result = yield call(userService.loadFollowersAPI);
    yield put({
      type: UserAction.LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

// 팔로잉 조회
function* loadFollowings() {
  try {
    const result = yield call(userService.loadFollowingsAPI);
    yield put({
      type: UserAction.LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(UserAction.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(UserAction.LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(UserAction.SIGN_UP_REQUEST, singUp);
}

function* watchLoadMyInfo() {
  yield takeLatest(UserAction.LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchFollow() {
  yield takeLatest(UserAction.FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UserAction.UNFOLLOW_REQUEST, unFollow);
}

function* watchRemoveFollower() {
  yield takeLatest(UserAction.REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* wetchChangeNickname() {
  yield takeLatest(UserAction.CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* wetchLoadFollowers() {
  yield takeLatest(UserAction.LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* wetchLoadFollowings() {
  yield takeLatest(UserAction.LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchRemoveFollower),
    fork(wetchChangeNickname),
    fork(wetchLoadFollowers),
    fork(wetchLoadFollowings),
  ]);
}

export default userSaga;
