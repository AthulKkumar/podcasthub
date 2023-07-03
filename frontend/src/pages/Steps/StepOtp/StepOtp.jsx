import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/Textinput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");

  function next() {}

  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code we send" icon="lock">
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div>
          <div className={styles.actionButtonWrapper}>
            <Button onClick={next} text="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you're agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepOtp;
