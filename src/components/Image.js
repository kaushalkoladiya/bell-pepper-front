import React from "react";
import PropTypes from "prop-types";

const Image = ({ image, extraLarge, ...props }) => (
  <img
    src={image || "https://via.placeholder.com/200"}
    alt={"not found"}
    style={{
      maxWidth: extraLarge ? 200 : 80,
      maxHeight: extraLarge ? 200 : 80,
      objectFit: "contain",
      borderRadius: 5,
      margin: "auto",
      boxShadow: "rgba(0, 0, 0, 0.3) 2px 3px 5px 1px",
      cursor: "pointer",
    }}
    {...props}
  />
);

Image.propTypes = {
  image: PropTypes.string,
  extraLarge: PropTypes.bool,
};

export default Image;
