const APP_INITIAL_STATE = {
  userManagementReducer: {
    usersList: [],
    pagination: {
      page: 0,
      perPage: 10,
    },
    sortByRole: false,
    selectedUsers: [],
    allUsersSelected: false,
  },
};

export default APP_INITIAL_STATE;
