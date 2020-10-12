import React from "react";
import downArrow from "assets/img/down-arrow.png";
import styles from "./UserListHeader.module.css";

interface Props {
  onAllUsersSelectionChanged: Function;
  allUsersSelected: boolean;
  allUsers: any[];
  sortByRole: boolean;
  toggleUserListSort: Function;
}

export default ({
  onAllUsersSelectionChanged,
  allUsersSelected,
  allUsers,
  sortByRole,
  toggleUserListSort,
}: Props) => {
  return (
    <div className={`${styles.container}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={allUsersSelected}
        onClick={(e: any) =>
          onAllUsersSelectionChanged(e.target.checked, allUsers)
        }
      />
      <div className={styles.name}>User</div>
      <div
        onClick={() => toggleUserListSort("sortByRole", !sortByRole)}
        className={styles.role}
      >
        Permission
        {sortByRole ? (
          <img className={styles.sortIcon} src={downArrow} alt="sorted" />
        ) : null}
      </div>
    </div>
  );
};
