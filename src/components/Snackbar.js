import React from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../redux/ui/actions";
import { Alert, AlertTitle } from "@material-ui/lab";

const Snackbar = () => {
  const dispatch = useDispatch();
  const { isSnackOpen: open, type, message } = useSelector((state) => state.UI);
  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={type} onClose={handleClose} variant="filled">
        <AlertTitle>{type}</AlertTitle>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
