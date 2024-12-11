import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  createCustomer, createCustomerSuccess, createCustomerFail,
  updateCustomer, updateCustomerSuccess, updateCustomerFail,
  deleteCustomer, deleteCustomerSuccess, deleteCustomerFail,
} from "../../states/modules/customer";

export const getListCustomer = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {

  let path = `api/v1/customers/getAllCustomers?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const handleCreateCustomer = (data) => async (dispatch, getState) => {
  // console.log('data', data);
  
  return callApi({
    method: 'post',
    apiPath: `api/v1/customers`,
    actionTypes: [createCustomer, createCustomerSuccess, createCustomerFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateCustomer = (data, idCustomer) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/customers/${idCustomer}`,
    actionTypes: [updateCustomer, updateCustomerSuccess, updateCustomerFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteCustomer = (idCustomer) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `api/v1/customers/${idCustomer}`,
    actionTypes: [deleteCustomer, deleteCustomerSuccess, deleteCustomerFail],
    variables: {},
    dispatch,
    getState
  })
}
