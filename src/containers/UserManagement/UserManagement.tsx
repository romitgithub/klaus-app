import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

import PaginatedList from "components/PaginatedList";
import UserCard from "components/UserCard/";

import { User } from "interface/User.interface";

import Header from "./Header";
import ListActionsHeader from "./ListActionsHeader";
import ListTableHeader from "./ListTableHeader";

import styles from "./UserManagement.module.css";

interface Props {
  fetchUsersList: Function;
  usersList: User[];
  allUsersSelected: boolean;
  selectedUsers: number[];
  pagination: any;
  sortByRole: boolean;
  updateSelectedUsers: Function;
  toggleAllUsersSelection: Function;
  toggleUserListSort: Function;
  updatePage: Function;
  isLoadingUsers: boolean;
}

class UserManagement extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUsersList();
  }

  handleUserSelection = (isSelected: boolean, userId: number) => {
    const { selectedUsers } = this.props;
    if (isSelected && selectedUsers.indexOf(userId) === -1) {
      selectedUsers.push(userId);
    } else if (!isSelected && selectedUsers.indexOf(userId) !== -1) {
      selectedUsers.splice(selectedUsers.indexOf(userId), 1);
    }

    this.props.updateSelectedUsers([...selectedUsers]);
  };

  sortUserList = (users: User[]) => {
    return users.sort((userA, userB) => (userA.role > userB.role ? 1 : -1));
  };

  render() {
    return (
      <div className={styles.container}>
        <Header />
        {this.props.isLoadingUsers ? (
          <div className={styles.loader}>Loading users...</div>
        ) : (
          <>
            {this.props.usersList.length ? (
              <div className={styles.list}>
                <ListActionsHeader
                  totalUsers={this.props.usersList.length}
                  selectedUsers={this.props.selectedUsers.length}
                />
                <PaginatedList
                  data={this.props.usersList}
                  sortItems={this.props.sortByRole}
                  getSortedItems={this.sortUserList}
                  page={this.props.pagination.page}
                  perPage={this.props.pagination.perPage}
                  updatePage={this.props.updatePage}
                  onHeaderRender={(items: User[]) => (
                    <ListTableHeader
                      allUsersSelected={this.props.allUsersSelected}
                      toggleAllUsersSelection={(
                        selected: boolean,
                        users: User[]
                      ) => this.props.toggleAllUsersSelection(users, selected)}
                      allUsers={items}
                      sortByRole={this.props.sortByRole}
                      toggleUserListSort={this.props.toggleUserListSort}
                    />
                  )}
                  onItemRender={(user: User) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onUserSelectionChanged={this.handleUserSelection}
                      isSelected={
                        this.props.selectedUsers.indexOf(user.id) !== -1
                      }
                    />
                  )}
                />
                )
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state.userManagementReducer,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUsersList: () => {
    dispatch(actions.fetchUsersList());
  },
  updateSelectedUsers: (selectedUsers: number[]) => {
    dispatch(actions.updateSelectedUsers(selectedUsers));
  },
  toggleAllUsersSelection: (
    selectedUsers: User[],
    allUsersSelected: boolean
  ) => {
    dispatch(actions.toggleAllUsersSelection(selectedUsers, allUsersSelected));
  },
  toggleUserListSort: (sortBy: string, sort: boolean) => {
    dispatch(actions.toggleUserListSort(sortBy, sort));
  },
  updatePage: (page: number) => {
    dispatch(actions.updatePage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
