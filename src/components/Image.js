import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";

import { BASE_URL } from "../constrants";

const Image = ({ image, extraLarge, ...props }) => {
  // const imageURL =
  //   image.search("storage") !== -1 ? `${BASE_URL}${image}` : image;

  return (
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
};

Image.propTypes = {
  image: PropTypes.string,
  extraLarge: PropTypes.bool,
};

export default Image;
