import callApi from "api/callApi";
import { getList, getListSuccess, getListFail,
    createUnit, createUnitSuccess, createUnitFail,
    updateUnit, updateUnitSuccess, updateUnitFail,
 } from "states/modules/unit";
export const getListUnit = (dataFilter = {
    perPage: '',
    page: 1
  }) => async (dispatch, getState) => {

    let path = `api/v1/units?limit=${dataFilter.perPage}&page=${dataFilter.page}`;
  
    if (dataFilter.keySearch) {
      path += `&keyword=${dataFilter.keySearch}`;
    }
  
    if (dataFilter.order && dataFilter.column) {
      path += `&orderBy=${dataFilter.order}&sortBy=${dataFilter.column}`;
    }
  
    return callApi({
      method: 'get',
      apiPath: path,
      actionTypes: [getList, getListSuccess, getListFail],
      variables: {},
      dispatch,
      getState
    })
  }

  export const handleCreateUnit = (data) => async (dispatch, getState) => { 
    return callApi({
      method: 'post',
      apiPath: `api/v1/units`,
      actionTypes: [createUnit, createUnitSuccess, createUnitFail],
      variables: data,
      dispatch,
      getState
    })
  }

  export const handleUpdateUnit = (data, idUnit) => async (dispatch, getState) => {
    return callApi({
      method: 'patch',
      apiPath: `api/v1/units/${idUnit}`,
      actionTypes: [updateUnit, updateUnitSuccess, updateUnitFail],
      variables: data,
      dispatch,
      getState
    })
  }
