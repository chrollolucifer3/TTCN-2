import callApi from "../callApi";
import {
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail,
  startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
  startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail
} from "../../states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/auth/login`,
    actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `api/v1/auth/info`,
    actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
    variables: {},
    dispatch,
    getState
  })
}

export const Logout = () => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/auth/logout`,
    actionTypes: [startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail],
    variables: {},
    dispatch,
    getState
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/users/forgotPassword`,
    actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
    variables: {
      email: data.email,
    },
    dispatch,
    getState
  })
}

export const updatePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `api/v1/users/resetPassword/${data.token}`,
    actionTypes: [startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail],
    variables: {
      passwordNew: data.passwordNew,
    },
    dispatch,
    getState
  })
}

