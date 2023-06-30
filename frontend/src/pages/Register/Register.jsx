import React, { useState } from "react";
import styles from "./Register.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepUsername from "../Steps/StepUsername/StepUsername";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepName from "../Steps/StepName/StepName";

// Hashmap of steps(Which component to render for each step)
const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepUsername,
  4: StepAvatar,
  5: StepName,
};

const Register = () => {
  const [step, setStep] = useState(1);
  //Here we are using the useState hook to set the initial state of the step to 1.
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
