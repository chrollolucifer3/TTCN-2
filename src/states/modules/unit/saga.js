import {
    all, fork, put, takeLatest
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import _ from "lodash";
  import {
    getListUnit
  } from "../../../api/unit";

  import {
    setErrorCreateOrUpdateUnit,
    setVisibleModalCreateOrUpdateUnit,
    createUnitFail, createUnitSuccess,
    updateUnitFail, updateUnitSuccess,
  } from "./index";

  import {getNotification} from "../../../utils/helper";
  
  function* loadRouteData () {
    yield put(setTitlePage('Unit'));
  }
  
  function* handleActions () {
    yield takeLatest(createUnitSuccess, function* () {
      getNotification('success', 'Create unit success');
      yield put(setVisibleModalCreateOrUpdateUnit(false));
      yield put(getListUnit());
    });

    yield takeLatest(createUnitFail, function* (action) {
      let status = action.payload.data.code;
      const errorMessage = _.get(action, 'payload.data.message'); // Lấy thông báo lỗi
      if(status === 409) {
        yield put(setErrorCreateOrUpdateUnit({
          name: errorMessage,
        }));
      }
      getNotification('error', 'Create unit fail');
    });

    yield takeLatest(updateUnitSuccess, function* () {
      getNotification('success', 'Update unit success');
      yield put(setVisibleModalCreateOrUpdateUnit(false));
      yield put(getListUnit());
    });

    yield takeLatest(updateUnitFail, function* (action) {
      let status = action.payload.data.code;
      if (status === 422) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateUnit({
          name: _.get(errors, 'name', ''),
          description: _.get(errors, 'description', ''),
        }));
      }
      getNotification('error', 'Update unit fail');
  });

}

  export default function* loadUnitSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  