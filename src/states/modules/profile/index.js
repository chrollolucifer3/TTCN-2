import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    errorChangePassword: {
      passwordOld: '',
      passwordNew: '',
    },
    loadingBtnChangePassword: false,
  },
  reducers: {
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload
    }),
    changePassword: (state) => ({
      ...state,
      loadingBtnChangePassword: true
    }),
    changePasswordSuccess: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
    changePasswordFail: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
  }
})

export const {
  setErrorInfoUser,
  setErrorChangePassword,
  changePassword, changePasswordSuccess, changePasswordFail,
} = profileSlice.actions

export default profileSlice.reducer;
