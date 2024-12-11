import {
  createSlice
} from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    isLoadingTableCustomer: false,
    paginationListCustomer: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],
    visibleModalCreateOrUpdateCustomer: false,
    isLoadingBtnCreateOrUpdateCustomer: false,
    visitableModalUpdateStatusCustomer: false,
    isLoadingBtnUpdateStatusCustomer: false,
    visibleModalDeleteCustomer: false,
    isLoadingBtnDeleteCustomer: false,

    errorCreateOrUpdateCustomer: {
      code: "",
      description: "",
      discount_type: "",
      discount_amount: "",
      min_order_value: "",
      start_date: "",
      end_date: "",
      is_anniversary: "",
      is_loyalty_customer: "",
    },
  },
  reducers: {
    setErrorCreateOrUpdateCustomer: (state, action) => ({
      ...state,
      errorCreateOrUpdateCustomer: action.payload
    }),
    setVisibleModalCreateOrUpdateCustomer: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCustomer: action.payload
    }),
    setVisibleModalDeleteCustomer: (state, action) => ({
      ...state,
      visibleModalDeleteCustomer: action.payload
    }),
    setVisibleModalUpdateStatusCustomer: (state, action) => ({
      ...state,
      visibleModalUpdateStatusCustomer: action.payload
    }),
    getList: (state) => ({
      ...state,
      customers: [],
      isLoadingTableCustomer: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableCustomer: false,
      customers: action.payload.metadata.listCustomer,
      paginationListCustomer: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      customers: [],
      isLoadingTableCustomer: false
    }),
    createCustomer: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: true
    }),
    createCustomerSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: false
    }),
    createCustomerFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: false
    }),
    updateCustomer: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: true
    }),
    updateCustomerSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: false
    }),
    updateCustomerFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCustomer: false
    }),
    deleteCustomer: (state) => ({
      ...state,
      isLoadingBtnDeleteCustomer: true
    }),
    deleteCustomerSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteCustomer: false
    }),
    deleteCustomerFail: (state) => ({
      ...state,
      isLoadingBtnDeleteCustomer: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateCustomer,
  setVisibleModalDeleteCustomer,
  setVisibleModalCreateOrUpdateCustomer,
  setVisibleModalUpdateStatusCustomer,
  getList,
  getListSuccess,
  getListFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createCustomer,
  createCustomerSuccess,
  createCustomerFail,
  updateCustomer,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFail,
} = customerSlice.actions

export default customerSlice.reducer;