import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  createDiscount, createDiscountSuccess, createDiscountFail,
  updateDiscount, updateDiscountSuccess, updateDiscountFail,
  deleteDiscount, deleteDiscountSuccess, deleteDiscountFail,
} from "../../states/modules/discount";

export const getListDiscount = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {

  let path = `api/v1/discounts?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&keyword=${dataFilter.keySearch}`;
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

export const handleCreateDiscount = (data) => async (dispatch, getState) => {
  // console.log('data', data);
  
  return callApi({
    method: 'post',
    apiPath: `api/v1/discounts`,
    actionTypes: [createDiscount, createDiscountSuccess, createDiscountFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateDiscount = (data, idDiscount) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/discounts/${idDiscount}`,
    actionTypes: [updateDiscount, updateDiscountSuccess, updateDiscountFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteDiscount = (idDiscount) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `api/v1/discounts/${idDiscount}`,
    actionTypes: [deleteDiscount, deleteDiscountSuccess, deleteDiscountFail],
    variables: {},
    dispatch,
    getState
  })
}
