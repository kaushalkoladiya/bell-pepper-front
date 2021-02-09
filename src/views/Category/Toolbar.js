import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CATEGORY_DIALOG } from "../../redux/types";
import { permissionError } from "../../utils/alert";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, handleSearch, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.data.flag);

  const handleOpen = () => {
    if (!hasPermission) return permissionError();

    dispatch({ type: OPEN_CATEGORY_DIALOG });
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Add Category
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
                placeholder="Search Category"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};

export default Toolbar;
