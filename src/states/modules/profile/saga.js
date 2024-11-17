import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  changePasswordFail,
  changePasswordSuccess, setErrorChangePassword,
} from "./index";
import {getNotification} from "../../../utils/helper";
import {getMe} from "../../../api/auth";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('Profile'));
  yield put(setErrorChangePassword({
    passwordOld: '',
    passwordNew: '',
  }));
}

function* handleActions () {

  yield takeLatest(changePasswordSuccess, function* () {
    yield call(getNotification, 'success', 'Change password success');
    yield put(getMe());
  });

  yield takeLatest(changePasswordFail, function* (action) {
    let status = action.payload.data.code;
    if (status === 401) {
      const errorMessage = _.get(action, 'payload.data.message');
      
      yield put(setErrorChangePassword({
        passwordOld: errorMessage,
      }));
    }
    getNotification('error', 'Change password fail');
  });
}

export default function* loadProfileSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
