import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
// import * as styles from "./home.module.css";

const Home = () => {
  // Style object for signin link
  const signinLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    marginLeft: "10px",
    textDecoration: "none",
  };

  const navigate = useNavigate();
  // Function to navigate to register page
  function startRegister() {
    navigate("/register");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="PodcastHub" icon="mic">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks.
        </p>
        <div>
          <Button onClick={startRegister} text="Get Username" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite link</span>
          <Link style={signinLinkStyle} to="/login">
            SignIn
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
