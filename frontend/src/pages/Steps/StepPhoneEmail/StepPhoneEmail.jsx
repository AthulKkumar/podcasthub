import React from "react";

const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>Email or Phone</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepPhoneEmail;
