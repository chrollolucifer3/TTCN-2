import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    units: [],
    isLoadingTableUnit: false,
    paginationListUnit: {
      currentPage: 1,
      perPage: '',
      totalPage: 1,
      totalRecord: 0,
    },

    visibleModalCreateOrUpdateUnit: false,
    visitableModalUpdateStatusUnit: false,
    isLoadingBtnCreateOrUpdateUnit: false,
    errorCreateOrUpdateUnit: {
      name: '',
      description: '',
    },
  },
  reducers: {
    setErrorCreateOrUpdateUnit: (state, action) => ({
      ...state,
      errorCreateOrUpdateUnit: action.payload
    }),

    //abc
    setVisibleModalCreateOrUpdateUnit: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateUnit: action.payload
    }),

    getList: (state) => ({
      ...state,
      units: [],
      isLoadingTableUnit: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableUnit: false,
      units: action.payload.metadata.listUnits,
      paginationListUnit: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      units: [],
      isLoadingTableUnit: false
    }),
    createUnit: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: true
    }),
    createUnitSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: false
    }),
    createUnitFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: false,
    }),
    updateUnit: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: true
    }),
    updateUnitSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: false
    }),
    updateUnitFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateUnit: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateUnit,
  setVisibleModalCreateOrUpdateUnit,
  getList, getListSuccess, getListFail,
  createUnit, createUnitSuccess, createUnitFail,
  updateUnit, updateUnitSuccess, updateUnitFail,

} = unitSlice.actions

export default unitSlice.reducer;
