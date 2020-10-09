import React from "react";
import { getUserRoleName } from "services/utils";
import styles from "./UserCard.module.css";

interface Props {
  user: any;
  onUserSelectionChanged: Function;
  isSelected: boolean;
}

export default ({ user, onUserSelectionChanged, isSelected }: Props) => {
  return (
    <div
      className={`${styles.container} ${
        isSelected ? styles.selectedContainer : null
      }`}
      onClick={() => onUserSelectionChanged(!isSelected, user.id)}
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isSelected}
        onClick={(e: any) => onUserSelectionChanged(e.target.checked, user.id)}
      />
      <img className={styles.avatar} src={user.avatar} />
      <div className={styles.nameEmailBlock}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.email}>{user.email}</span>
      </div>
      <div className={styles.roleBlock}>
        <span className={styles.role}>{getUserRoleName(user.role)}</span>
      </div>
    </div>
  );
};
