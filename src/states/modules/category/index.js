import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    foods: [],
    isLoadingListCategory: false,
    paginationListCategory: {
      currentPage: 1,
      perPage: '',
      totalPage: 1,
      totalRecord: 0,
    },

    visibleModalCreateOrUpdateCategory: false,
    isLoadingBtnCreateOrUpdateCategory: false,
    visibleModalListFoodByCategory: false,
    errorCreateOrUpdateCategory: {
      name: '',
    },
  },
  reducers: {
    setErrorCreateOrUpdateCategory: (state, action) => ({
      ...state,
      errorCreateOrUpdateCategory: action.payload
    }),

    setVisibleModalCreateOrUpdateCategory: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCategory: action.payload
    }),
    setVisibleModalListFoodByCategory: (state, action) => ({
      ...state,
      visibleModalListFoodByCategory: action.payload
    }),
    getListFoodByCategoryId : (state) => ({
      ...state,
      foods: [],
    }),
    getListFoodByCategoryIdSuccess : (state, action) => ({
      ...state,
      foods: action.payload.metadata.foodData.listFoods,
    }),
    getListFoodByCategoryIdFail : (state) => ({
      ...state,
      foods: [],
    }),
    getList: (state) => ({
      ...state,
      categories: [],
      isLoadingListCategory: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingListCategory: false,
      categories: action.payload.metadata.list,
      paginationListCategory: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      categories: [],
      isLoadingListCategory: false
    }),
    createCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true
    }),
    createCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    createCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false,
    }),
    updateCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true
    }),
    updateCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    updateCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateCategory,
  setVisibleModalCreateOrUpdateCategory,
  setVisibleModalListFoodByCategory,
  getList, getListSuccess, getListFail,
  createCategory, createCategorySuccess, createCategoryFail,
  updateCategory, updateCategorySuccess, updateCategoryFail,
  getListFoodByCategoryId, getListFoodByCategoryIdSuccess, getListFoodByCategoryIdFail
} = categorySlice.actions

export default categorySlice.reducer;
