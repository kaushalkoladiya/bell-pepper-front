import React from "react";
import PropTypes from "prop-types";
// Mui
import { Typography } from "@material-ui/core";

const Title = ({ title, large }) => (
  <Typography variant={large ? "h3" : "h4"} color="inherit">
    {title}
  </Typography>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
};

export default Title;
