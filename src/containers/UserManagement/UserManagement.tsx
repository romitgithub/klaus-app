import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import PaginatedList from "components/PaginatedList";
import UserCard from "components/UserCard/";

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
          <div className={styles.title}>User Management</div>
        </div>
        <div className={styles.list}>
          {this.props.selectedUsers.length ? (
            <div className={styles.listActionHeader}>
              <span className={styles.listActionTitle}>
                {this.props.selectedUsers.length} users selected
              </span>
            </div>
          ) : null}
          <PaginatedList
            data={this.props.usersList}
            onItemRender={(user: any) => (
              <UserCard
                user={user}
                onUserSelectionChanged={this.handleUserSelection}
                isSelected={this.props.selectedUsers.indexOf(user.id) !== -1}
              />
            )}
          />
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
