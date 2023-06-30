import React from "react";

const StepUsername = ({ onNext }) => {
  return (
    <>
      <div>UserName</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepUsername;
