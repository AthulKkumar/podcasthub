import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card>
        <svg
          className={styles.spinner}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
        >
          <path
            fill="#5453E0"
            d="M19.778.001A20 20 0 1 1 .543 24.627l3.876-.921a16.016 16.016 0 1 0 15.403-19.72L19.778 0Z"
          />
        </svg>
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
