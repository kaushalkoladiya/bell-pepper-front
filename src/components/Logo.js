import React from "react";
import Icon from "../images/icon.jpeg";

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src={Icon}
      {...props}
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
      }}
    />
  );
};

export default Logo;
