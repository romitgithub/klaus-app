import { User } from "interface/User.interface";
import ApiService from "services/ApiService";
import ACTION_TYPES from "./actionType";

export const fetchUsersList = () => {
  return (dispatch: Function) => {
    dispatch(toggleLoadingState(true));
    ApiService.get(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json",
      {}
    ).then(
      (response) => {
        dispatch(toggleLoadingState(false));
        dispatch({
          type: ACTION_TYPES.FETCH_USER_LIST,
          data: response.users,
        });
      },
      (err) => {
        dispatch(toggleLoadingState(false));
        console.log(err);
      }
    );
  };
};

export const updateSelectedUsers = (selectedUsers: number[]) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_SELECTED_USERS,
      data: selectedUsers,
    });
  };
};

export const toggleAllUsersSelection = (
  selectedUsers: User[],
  allSelected: boolean
) => {
  const selectedUsersId = selectedUsers.map((item) => item.id);
  return (dispatch: Function) => {
    if (allSelected) {
      dispatch({
        type: ACTION_TYPES.TOGGLE_ALL_USERS_SELECTION,
        data: { selectedUsers: selectedUsersId, allSelected },
      });
    } else {
      dispatch({
        type: ACTION_TYPES.TOGGLE_ALL_USERS_SELECTION,
        data: { selectedUsers: [], allSelected },
      });
    }
  };
};

export const toggleUserListSort = (sortBy: string, sort: boolean) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_SORT,
      data: { sortBy, sort },
    });
  };
};

export const updatePage = (page: number) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_PAGE,
      data: page,
    });
  };
};

export const toggleLoadingState = (loadingState: boolean) => {
  return (dispatch: Function) => {
    dispatch({
      type: ACTION_TYPES.SET_IS_LOADING,
      data: loadingState,
    });
  };
};
