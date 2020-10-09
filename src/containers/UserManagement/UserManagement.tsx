import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import PaginatedList from "components/PaginatedList";
import UserCard from "components/UserCard/";
import editIcon from "assets/img/edit.png";
import deleteIcon from "assets/img/delete.png";
import searchIcon from "assets/img/search.png";

import styles from "./UserManagement.module.css";

interface Props {
  fetchUsersList: Function;
  usersList: any[];
  selectedUsers: any[];
  updateSelectedUsers: Function;
}

class UserManagement extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUsersList();
  }

  handleUserSelection = (isSelected: boolean, userId: number) => {
    const { selectedUsers } = this.props;
    if (isSelected && selectedUsers.indexOf(userId) === -1) {
      selectedUsers.push(userId);
    } else if (!isSelected) {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
