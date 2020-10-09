import APP_INITIAL_STATE from "store/initialState";
import ACTION_TYPES from "./actionType";

const userManagementReducer = (
  state = APP_INITIAL_STATE.userManagementReducer,
  action: {
    type: string;
    data: {
      [key: string]: any;
    };
  }
) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_USER_LIST:
      return { ...state, usersList: action.data };
    case ACTION_TYPES.UPDATE_SELECTED_USERS:
      return { ...state, selectedUsers: action.data };
    default:
      return state;
  }
};

export default userManagementReducer;
