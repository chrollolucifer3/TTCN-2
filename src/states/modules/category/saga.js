import {
    all, fork, put, takeLatest
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import _ from "lodash";
  import {
    getListCategory
  } from "../../../api/category";

  import {
    setErrorCreateOrUpdateCategory,
    setVisibleModalCreateOrUpdateCategory,
    createCategoryFail, createCategorySuccess,
    updateCategoryFail, updateCategorySuccess,
  } from "./index";

  import {getNotification} from "../../../utils/helper";
  
  function* loadRouteData () {
    yield put(setTitlePage('Category'));
  }
  
  function* handleActions () {
    yield takeLatest(createCategorySuccess, function* () {
      
      getNotification('success', 'Create Category success');
      yield put(setVisibleModalCreateOrUpdateCategory(false));
      yield put(getListCategory());
    });

    yield takeLatest(createCategoryFail, function* (action) {
      let status = action.payload.data.code;
  
      if (status === 409) {
        let errors = action.payload.data.details;
        
        yield put(setErrorCreateOrUpdateCategory({
          name: _.get(errors, 'name', ''),
        }));
      }
      getNotification('error', 'Create Category fail');
    });

    yield takeLatest(updateCategorySuccess, function* () {
      getNotification('success', 'Update Category success');
      yield put(setVisibleModalCreateOrUpdateCategory(false));
      yield put(getListCategory());
    });

    yield takeLatest(updateCategoryFail, function* (action) {
      let status = action.payload.data.code;
      if (status === 409) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateCategory({
          name: _.get(errors, 'name', ''),
        }));
      }
      getNotification('error', 'Update Category fail');
  });

}

  export default function* loadCategorySaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  