import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const brandStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const logoText = {
    marginLeft: "0.5rem",
  };

  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Logout functionaliy and setting null data in stroe
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/mic.png" alt="logo" />
        <span style={logoText}>PodcastHub</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>

          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : ""}
              alt="avatar"
              width="40"
              height="40"
            />
          </Link>

          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
