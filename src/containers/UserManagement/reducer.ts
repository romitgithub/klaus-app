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
      return {
        ...state,
        selectedUsers: action.data,
        allUsersSelected:
          action.data.length === state.pagination.perPage ? true : false,
      };
    case ACTION_TYPES.TOGGLE_ALL_USERS_SELECTION:
      return {
        ...state,
        selectedUsers: action.data.selectedUsers,
        allUsersSelected: action.data.allSelected,
      };
    case ACTION_TYPES.TOGGLE_SORT:
      return {
        ...state,
        [action.data.sortBy]: action.data.sort,
      };
    case ACTION_TYPES.UPDATE_PAGE:
      return {
        ...state,
        selectedUsers: [],
        allUsersSelected: false,

        pagination: { ...state.pagination, page: action.data },
      };
    case ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoadingUsers: action.data,
      };
    default:
      return state;
  }
};

export default userManagementReducer;
