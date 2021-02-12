import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";

const Image = ({ image, extraLarge, ...props }) => (
  <Avatar
    src={image || "https://via.placeholder.com/200"}
    alt={image}
    style={{
      width: extraLarge ? 200 : 80,
      height: extraLarge ? 200 : 80,
      objectFit: "cover",
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
