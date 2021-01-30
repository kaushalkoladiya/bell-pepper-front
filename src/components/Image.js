import React from "react";
import PropTypes from "prop-types";

import { BASE_URL } from "../constrants";

const Image = ({ image, extraLarge, ...props }) => {
  const imageURL =
    image.search("storage") !== -1 ? `${BASE_URL}${image}` : image;

  return (
    <img
      src={imageURL}
      alt={image}
      style={{
        width: extraLarge ? 200 : 80,
        height: extraLarge ? 200 : 80,
        objectFit: "cover",
        borderRadius: 5,
        margin: 2,
        boxShadow: "rgba(0, 0, 0, 0.3) 2px 3px 5px 1px",
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
