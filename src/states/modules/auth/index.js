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
    isLoadingBtnLogin: false,
    isLoadingBtnLogout: false,
  },
  reducers: {
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
  }
})

export const {
  startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
  startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
  startRequestLogOut, startRequestLogOutSuccess, startRequestLogOutFail,
  setErrorLogin
} = authSlice.actions

export default authSlice.reducer;
