import callApi from "../callApi";
import {
  changePassword, changePasswordFail, changePasswordSuccess,
} from "../../states/modules/profile";


export const handleChangePassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/auth/changePassword`,
    actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
    variables: data,
    dispatch,
    getState
  })
}
