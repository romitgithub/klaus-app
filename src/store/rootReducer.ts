import { combineReducers } from "redux";

import userManagementReducer from "containers/UserManagement/reducer";

const appReducer = combineReducers({
  userManagementReducer,
});

export default appReducer;
