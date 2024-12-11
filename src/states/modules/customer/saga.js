import {
    all, fork, put, takeLatest, call
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import {
    getListCustomer
  } from "../../../api/customer";
  import {
    setErrorCreateOrUpdateCustomer,
    setVisibleModalCreateOrUpdateCustomer,
    setVisibleModalDeleteCustomer,
    createCustomerFail, createCustomerSuccess,
    updateCustomerFail, updateCustomerSuccess,
    deleteCustomerFail, deleteCustomerSuccess,
  } from "./index";
  import {getNotification} from "../../../utils/helper";
  import _ from "lodash";
  
  function* loadRouteData () {
    yield put(setTitlePage('Customer Management'));
  
  }
  
  function* handleActions () {
    yield takeLatest(createCustomerSuccess, function* () {
      getNotification('success', 'Create customer success');
      yield put(setVisibleModalCreateOrUpdateCustomer(false));
      yield put(getListCustomer());
    });
  
    yield takeLatest(createCustomerFail, function* (action) {
      let status = action.payload.data.code;
  
      if (status === 409) {
        let errors = action.payload.data.message;
        
        yield put(setErrorCreateOrUpdateCustomer({
          phone_number: errors,
        }));
      }
      getNotification('error', 'Create customer fail');
    });
  
    yield takeLatest(updateCustomerSuccess, function* () {
      getNotification('success', 'Update Customer success');
      yield put(setVisibleModalCreateOrUpdateCustomer(false));
      yield put(getListCustomer());
    });
  
    yield takeLatest(updateCustomerFail, function* (action) {
      let status = action.payload.data.code;
      if (status === 409) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateCustomer({
          phone_number: _.get(errors, 'phone_number', ''),
        }));
      } else if (status === 403) {
        getNotification('error', "You don't have permission to access!");
      } else {
        getNotification('error', 'Update customer fail');
      }
    });
  
  
    yield takeLatest(deleteCustomerSuccess, function* () {
      getNotification('success', 'Delete Customer success');
      yield put(setVisibleModalDeleteCustomer(false));
      yield put(getListCustomer());
    });
  
    yield takeLatest(deleteCustomerFail, function* () {
      yield call(getNotification, 'error', 'Failed to delete customer.');
    });
  
  }
  
  export default function* loadCustomerSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  