import loadAuthSaga from "../states/modules/auth/saga";
import loadHomeSaga from "../states/modules/home/saga";
import loadAboutSaga from "../states/modules/about/saga";
import loadProfileSaga from "../states/modules/profile/saga";
import loadEmployeeSaga from "../states/modules/employee/saga";
import loadUnitSaga from "../states/modules/unit/saga";
import loadCategorySaga from "states/modules/category/saga";

export const ROUTE_SAGAS = [];
ROUTE_SAGAS['LOAD_AUTH_PAGE'] = loadAuthSaga
ROUTE_SAGAS['LOAD_HOME_PAGE'] = loadHomeSaga
ROUTE_SAGAS['LOAD_ABOUT_PAGE'] = loadAboutSaga
ROUTE_SAGAS['LOAD_PROFILE_PAGE'] = loadProfileSaga
ROUTE_SAGAS['LOAD_EMPLOYEE_PAGE'] = loadEmployeeSaga
ROUTE_SAGAS['LOAD_UNIT_PAGE'] = loadUnitSaga
ROUTE_SAGAS['LOAD_CATEGORY_PAGE'] = loadCategorySaga
