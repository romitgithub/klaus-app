import React from "react";
import editIcon from "assets/img/edit.png";
import deleteIcon from "assets/img/delete.png";

import styles from "./ListActionsHeader.module.css";

interface Props {
  totalUsers: number;
  selectedUsers: number;
}

const getUserCountText = (userCount: number) => {
  return `${userCount > 1 ? "users" : "user"}`;
};

const ListActionsHeader = ({ totalUsers, selectedUsers }: Props) => {
  return (
    <>
      {selectedUsers ? (
        <div className={styles.listActionHeader}>
          <span className={styles.listActionTitle}>
            {selectedUsers} {getUserCountText(selectedUsers)} selected
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
            {totalUsers} {getUserCountText(totalUsers)}
          </span>
        </div>
      )}
    </>
  );
};

export default ListActionsHeader;
