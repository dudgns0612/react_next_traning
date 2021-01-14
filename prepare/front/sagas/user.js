import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';

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
    yield put({ type: 'LOG_IN_SUCCESS', data: action.data });
  } catch (err) {
    yield put({ type: 'LOG_IN_FAILURE' });
  }
}

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: 'LOG_OUT_SUCCESS' });
  } catch (err) {
    yield put({ type: 'LOG_OUT_FAILURE' });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}

export default userSaga;
