import {
  all, fork, takeLatest, put
} from "redux-saga/effects";
import {
  startRequestLoginSuccess,
  startRequestLoginFail,
  setErrorLogin,
  startRequestForgotPasswordSuccess,
  startRequestForgotPasswordFail,
  setErrorDataForgotPassword,
  startRequestUpdatePasswordSuccess,
  startRequestUpdatePasswordFail
} from "./index";
import {setAuthToken} from "../../../utils/localStorage";
import {getMe} from "../../../api/auth";
import {getNotification} from "../../../utils/helper";
import _ from "lodash";

function* loadRouteData () {
  //
}

function* handleActions () {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.metadata.accessToken;
    setAuthToken(token);
    yield put(getMe());
  });

  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.data.code;
    const errorMessage = _.get(action, 'payload.data.message'); // Lấy thông báo lỗi
    if (statusError === 404) {
      yield put(setErrorLogin({
        email: errorMessage,
      }));
    } else if(statusError === 401) {
      yield put(setErrorLogin({
        password: errorMessage,
      }));
    } else {
      getNotification('error', 'Server error');
    }
  });

  yield takeLatest(startRequestForgotPasswordSuccess, function () {
    getNotification('success', 'Please check your email');
  });

  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.data.code;
    const errorMessage = _.get(action, 'payload.data.message'); // Lấy thông báo lỗi
    if (statusError === 400) {
      getNotification('error', errorMessage);
    } else if (statusError === 404) {
      yield put(setErrorDataForgotPassword({
        email: errorMessage,
      }));
    }
     else {
      getNotification('error', 'Server error');
    }
  });
  yield takeLatest(startRequestUpdatePasswordSuccess, function () {
    getNotification('success', 'Update password success');
  });
  yield takeLatest(startRequestUpdatePasswordFail, function (action) {
    let statusError = action.payload.data.code;
    const errorMessage = _.get(action, 'payload.data.message'); // Lấy thông báo lỗi
    if (statusError === 400) {
      getNotification('error', errorMessage);
    } else {
      getNotification('error', 'Server error');
    }
  }
  );
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
