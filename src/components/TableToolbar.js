import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

function TableToolbar({
  className,
  title,
  hideAddButton,
  onSearch,
  onAddButtonClick,
  component,
  ...rest
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {title && <Typography variant="h4">{title}</Typography>}

            {component && <Box minWidth={400}>{component}</Box>}

            {!hideAddButton && (
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onAddButtonClick}
                >
                  Add {title}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

TableToolbar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  hideAddButton: PropTypes.bool,
};

export default TableToolbar;
