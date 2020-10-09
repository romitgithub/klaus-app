import React, { useState } from "react";
import { getUserRoleName } from "services/utils";
import editIcon from "assets/img/edit.png";
import deleteIcon from "assets/img/delete.png";
import styles from "./UserCard.module.css";

const getClassNameForRole = (role: string) => {
  switch (role) {
    case "ADMIN":
      return styles.admin;
    case "AGENT":
      return styles.agent;
    case "EXTERNAL_REVIEWER":
      return styles.externalReviewer;
    case "ACCOUNT_MANAGER":
      return styles.accountManager;
    default:
      return "";
  }
};

interface Props {
  user: any;
  onUserSelectionChanged: Function;
  isSelected: boolean;
}

export default ({ user, onUserSelectionChanged, isSelected }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        isSelected ? styles.selectedContainer : null
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onUserSelectionChanged(!isSelected, user.id)}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isSelected}
        onClick={(e: any) => onUserSelectionChanged(e.target.checked, user.id)}
      />
      <img className={styles.avatar} src={user.avatar} alt="user-avatar" />
      <div className={styles.nameEmailBlock}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.email}>{user.email}</span>
      </div>
      <div className={styles.roleBlock}>
        <span className={`${styles.role} ${getClassNameForRole(user.role)}`}>
          {getUserRoleName(user.role)}
        </span>
      </div>
      <div
        className={`${styles.actionButtons} ${
          isHovering ? styles.isHover : ""
        }`}
      >
        <button className={styles.actionButton}>
          {" "}
          <img
            src={editIcon}
            alt="edit user"
            className={styles.editIcon}
          />{" "}
          Edit
        </button>
        <button className={styles.actionButton}>
          <img
            src={deleteIcon}
            alt="delete user"
            className={styles.deleteIcon}
          />
        </button>
      </div>
    </div>
  );
};
