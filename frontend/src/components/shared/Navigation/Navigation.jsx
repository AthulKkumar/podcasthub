import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

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

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/mic.png" alt="logo" />
        <span style={logoText}>PodcastHub</span>
      </Link>
    </nav>
  );
};

export default Navigation;
