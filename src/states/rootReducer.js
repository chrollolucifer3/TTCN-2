import appReducer from './modules/app';
import authReducer from './modules/auth';
import profileReducer from './modules/profile';
import homeReducer from './modules/home';
import aboutReducer from './modules/about';
import employeeReducer from './modules/employee';
import unitReducer from './modules/unit';
import categoryReducer from './modules/category';
import customerReducer from './modules/customer';
import discountReducer from './modules/discount';
import menuReducer from './modules/menu';

const rootReducer = {
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  about: aboutReducer,
  employee: employeeReducer,
  unit: unitReducer,
  category: categoryReducer,
  customer: customerReducer,
  discount: discountReducer,
  menu: menuReducer,
}

export default rootReducer
