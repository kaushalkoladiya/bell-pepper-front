import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import ReactDatePicker from "react-date-picker";

const DatePicker = ({ date, onChange, title }) => {
  return (
    <div style={{ margin: 2 }}>
      <Typography>{title}</Typography>
      <ReactDatePicker onChange={onChange} value={date} />
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
};

export default DatePicker;
