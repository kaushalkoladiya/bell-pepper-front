import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = ({ error }) => (
  <>
    {error && (
      <div style={{ textAlign: "center" }}>
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      </div>
    )}
  </>
);

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
