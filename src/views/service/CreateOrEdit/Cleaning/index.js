import React from "react";
import PropTypes from "prop-types";
// redux
import { cleaningBookingState } from "../../../../redux/service/state";
// Mui
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper, Typography } from "@material-ui/core";
// components
import RichTextBox from "../../../../components/RichTextBox";
import Frequency from "./Frequency";
import Hour from "./Hour";
import Staff from "./Staff";
import Detail from "./Detail";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "0 5px 5px 5px",
  },
  container: {
    margin: "10px 0",
    padding: 10,
  },
  containerItems: {
    marginTop: 10,
    display: "flex",
  },
}));

const Title = ({ title, large }) => (
  <Typography variant={large ? "h3" : "h5"} color="inherit">
    {title}
  </Typography>
);

const Cleaning = () => {
  const classes = useStyles();

  const handleOnBlur = (event) => {
    console.log(event);
    // console.log(event.target.value);
  };

  let largeTextFields = [
    {
      funcArg: "hourDescription",
      placeholder: "Hour Description",
      title: "Hour Description",
    },
    {
      funcArg: "cleaningMaterialsDescription",
      placeholder: "Cleaning Materials Description",
      title: "Cleaning Materials Description",
    },
    {
      funcArg: "certification",
      placeholder: "Certification",
      title: "Certification",
    },
    {
      funcArg: "packageInclude",
      placeholder: "What the package should Include?",
      title: "What the package should Include?",
    },
    {
      funcArg: "brandUsed",
      placeholder: "What brand will be use in it?",
      title: "What brand will be use in it?",
    },
    {
      funcArg: "suitable",
      placeholder: "Suitability?",
      title: "Suitability?",
    },
  ];

  let smallTextFields = [
    {
      funcArg: "price",
      placeholder: "Service Price",
      title: "Service Price",
    },
    {
      funcArg: "discount",
      placeholder: "Discount on final price?",
      title: "Discount on final price?",
    },
  ];

  return (
    <React.Fragment>
      <Paper className={classes.container}>
        <div className={classes.containerItems}>
          {smallTextFields.map((item, key) => (
            <TextField
              key={key}
              title={item.title}
              placeholder={item.placeholder}
              className={classes.textField}
              type="number"
              fullWidth
            />
          ))}
        </div>
      </Paper>

      <Frequency />
      <Hour />
      <Staff />
      <Detail />

      {/* {largeTextFields.map((item, key) => (
        <RichTextBox
          key={key}
          title={item.title}
          placeholder={item.placeholder}
          onTextChange={handleOnBlur}
          funcArg={item.funcArg}
        />
      ))} */}
    </React.Fragment>
  );
};

Cleaning.propTypes = {
  price: PropTypes.string,
  discount: PropTypes.string,
  onChange: PropTypes.func,
};

export default Cleaning;
