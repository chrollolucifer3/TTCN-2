import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser:{},
    loginError: {
      email: '',
      password: '',
    },
    forgotPasswordError: {
      email: '',
    },
    isLoadingBtnLogin: false,
    isLoadingBtnLogout: false,
    isLoadingBtnForgotPassword: false,
    isLoadingBtnUpdatePassword: false,
  },
  reducers: {
    setErrorDataForgotPassword: (state, action) => {
      state.forgotPasswordError = action.payload;
    },
    setErrorLogin: (state, action) => {
      state.loginError = action.payload;
    },
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.metadata

    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestLogOut: (state) => ({
      ...state,
      isLoadingBtnLogout: true
    }),
    startRequestLogOutSuccess: (state) => ({
      ...state,
      isLoadingBtnLogout: false,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestLogOutFail: (state) => ({
      ...state,
      isLoadingBtnLogout: false
    }),
    startRequestForgotPassword: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: true
    }),
    startRequestForgotPasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestForgotPasswordFail: (state) => ({
      ...state,
      isLoadingBtnForgotPassword: false
    }),
    startRequestUpdatePassword: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: true
    }),
    startRequestUpdatePasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: false
    }),
    startRequestUpdatePasswordFail: (state) => ({
      ...state,
      isLoadingBtnUpdatePassword: false
    }),
  }
})

export const {
  startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
  startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail,
  startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail,
  setErrorLogin, setErrorDataForgotPassword,
  startRequestUpdatePassword, startRequestUpdatePasswordSuccess, startRequestUpdatePasswordFail

} = authSlice.actions

export default authSlice.reducer;
