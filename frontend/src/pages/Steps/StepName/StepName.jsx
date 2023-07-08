import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);

  function nextStep() {
    if (!fullName) {
      return;
    }

    dispatch(setName(fullName));
    onNext();
  }
  return (
    <>
      <Card title="What's your name ?" icon="name-emoji">
        <TextInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div>
          <p className={styles.paragraph}>
            People uses real names at podcast hub :)
          </p>
          <div className={styles.actionButtonWrapper}>
            <Button onClick={nextStep} text="Next" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepName;
