import callApi from "../callApi";
import {
  startRequestGetMe, startRequestGetMeFail, startRequestGetMeSuccess,
  startRequestLogin, startRequestLoginFail, startRequestLoginSuccess,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail
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

