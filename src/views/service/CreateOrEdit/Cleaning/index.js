import React from "react";
// components
import Frequency from "./Frequency";
import Hour from "./Hour";
import Staff from "./Staff";
import Detail from "../Detail";

const Cleaning = () => {
  return (
    <React.Fragment>
      <Frequency />
      <Hour />
      <Staff />
      <Detail />
    </React.Fragment>
  );
};

export default Cleaning;
