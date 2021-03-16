import React from "react";
import PropTypes from "prop-types";
// Mui
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 10,
  },
}));

const Gas = ({ price, discount, onChange }) => {
  const classes = useStyles();

  const handleOnBlur = (event) => {
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
      <TextField
        className={classes.textField}
        value={price}
        name="price"
        onBlur={handleOnBlur}
        error={!price ? true : false}
        helperText={!price}
        label="Price"
        type="number"
        fullWidth
      />

      <TextField
        className={classes.textField}
        value={discount}
        name="discount"
        onBlur={handleOnBlur}
        error={!discount ? true : false}
        helperText={!discount}
        label="Discount"
        type="number"
        fullWidth
      />
    </React.Fragment>
  );
};

Gas.propTypes = {
  price: PropTypes.string,
  discount: PropTypes.string,
  onChange: PropTypes.func,
};

export default Gas;
