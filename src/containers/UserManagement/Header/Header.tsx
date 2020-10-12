import React from "react";
import searchIcon from "assets/img/search.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
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
  );
};

export default Header;
