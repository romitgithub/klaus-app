import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import PaginatedList from "components/PaginatedList";
import UserCard from "components/UserCard/";
import editIcon from "assets/img/edit.png";
import deleteIcon from "assets/img/delete.png";
import searchIcon from "assets/img/search.png";

import styles from "./UserManagement.module.css";
import UserListHeader from "components/UserListHeader/UserListHeader";

interface Props {
  fetchUsersList: Function;
  usersList: any[];
  allUsersSelected: boolean;
  selectedUsers: any[];
  pagination: any;
  sortByRole: boolean;
  updateSelectedUsers: Function;
  toggleAllUsersSelection: Function;
  toggleUserListSort: Function;
  updatePage: Function;
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

  render() {
    console.log(this.props);
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Account users</div>
          <div className={styles.filterOptions}>
            <div className={styles.searchBox}>
              <img
                src={searchIcon}
                alt="Search Users"
                className={styles.searchIcon}
              />
              <input
                placeholder="Search"
                type="text"
                className={styles.searchInput}
              />
            </div>
            <button className={styles.connectUsersBtn}>Connect Users</button>
          </div>
        </div>
        <div className={styles.list}>
          {this.props.selectedUsers.length ? (
            <div className={styles.listActionHeader}>
              <span className={styles.listActionTitle}>
                {this.props.selectedUsers.length} users selected
              </span>
              <button className={styles.listActionButton}>
                {" "}
                <img
                  src={editIcon}
                  alt="edit users"
                  className={styles.editIcon}
                />{" "}
                Edit
              </button>
              <button className={styles.listActionButton}>
                <img
                  src={deleteIcon}
                  alt="delete users"
                  className={styles.deleteIcon}
                />{" "}
                Delete
              </button>
            </div>
          ) : (
            <div className={styles.listActionHeader}>
              <span className={styles.listActionTitle}>
                {this.props.usersList.length} users
              </span>
            </div>
          )}
          {this.props.usersList.length ? (
            <PaginatedList
              data={this.props.usersList}
              sortItems={this.props.sortByRole}
              getSortedItems={(items: any[]) =>
                items.sort((a, b) => (a.role > b.role ? 1 : -1))
              }
              page={this.props.pagination.page}
              perPage={this.props.pagination.perPage}
              updatePage={this.props.updatePage}
              onHeaderRender={(items: any[]) => (
                <UserListHeader
                  allUsersSelected={this.props.allUsersSelected}
                  onAllUsersSelectionChanged={(
                    selected: boolean,
                    users: any[]
                  ) => this.props.toggleAllUsersSelection(users, selected)}
                  allUsers={items}
                  sortByRole={this.props.sortByRole}
                  toggleUserListSort={this.props.toggleUserListSort}
                />
              )}
              onItemRender={(user: any) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserSelectionChanged={this.handleUserSelection}
                  isSelected={this.props.selectedUsers.indexOf(user.id) !== -1}
                />
              )}
            />
          ) : null}
        </div>
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
  updateSelectedUsers: (selectedUsers: any[]) => {
    dispatch(actions.updateSelectedUsers(selectedUsers));
  },
  toggleAllUsersSelection: (
    selectedUsers: any[],
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
