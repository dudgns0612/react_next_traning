import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import * as UserAction from '../reducers/user';

function logInAPI() {
  return; //axios.~
}

function logOutAPI() {
  return; //axios.~
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({ type: UserAction.LOG_IN_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: UserAction.LOG_IN_FAILURE, error: err.response.data });
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: UserAction.LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: UserAction.LOG_OUT_FAILURE, error: err.response.data });
  }
}

function* singUp() {
  try {
    yield delay(1000);
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

function* watchLogIn() {
  yield takeLatest(UserAction.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(UserAction.LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(UserAction.LOG_OUT_REQUEST, singUp);
}

function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}

export default userSaga;
