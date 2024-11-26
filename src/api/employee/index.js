import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createEmployee, createEmployeeSuccess, createEmployeeFail,
  updateEmployee, updateEmployeeSuccess, updateEmployeeFail,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail,
} from "../../states/modules/employee";

export const getListEmployee = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
   // Nếu status tồn tại và có giá trị, thiết lập page về 1
  //  if (dataFilter.status && dataFilter.status.length > 0) {
  //   dataFilter.page = 1;
  // }
  let path = `api/v1/users/getAllUsers?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&keyword=${dataFilter.keySearch}`;
  }

  if (dataFilter.status && dataFilter.status.length > 0) {
    path += `&status=${dataFilter.status}`;
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

export const getAllRoleForEmployee = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `users/all-roles`,
    actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateEmployee = (data) => async (dispatch, getState) => {
  // console.log('data', data);
  
  return callApi({
    method: 'post',
    apiPath: `api/v1/users`,
    actionTypes: [createEmployee, createEmployeeSuccess, createEmployeeFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateEmployee = (data, idEmployee) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/users/${idEmployee}`,
    actionTypes: [updateEmployee, updateEmployeeSuccess, updateEmployeeFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteEmployee = (idEmployee) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `api/v1/users/${idEmployee}`,
    actionTypes: [deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail],
    variables: {},
    dispatch,
    getState
  })
}
