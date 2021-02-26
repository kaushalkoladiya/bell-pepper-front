import React from "react";
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 30,
  },
  dropdown: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    "&>span": {
      marginLeft: 8,
    },
  },
}));

const CategoryDropdown = ({ category, onChange, error }) => {
  const classes = useStyles();
  const categories = useSelector((state) => state.category.data);

  return (
    <div className={classes.dropdown}>
      <FormControl
        className={classes.formControl}
        variant="outlined"
        size="small"
        fullWidth
      >
        <InputLabel>Main Service</InputLabel>
        <Select
          value={category}
          onChange={onChange}
          error={error ? true : false}
        >
          {categories.map((category, key) => (
            <MenuItem key={key} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
};

CategoryDropdown.propTypes = {
  category: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default React.memo(CategoryDropdown);
