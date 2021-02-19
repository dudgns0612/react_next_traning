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

function* follow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UserAction.FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* unFollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UserAction.UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UserAction.UNFOLLOW_FAILURE,
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

function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}

export default userSaga;
