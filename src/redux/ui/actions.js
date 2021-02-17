import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./type";

export const openSnackbar = (payload) => ({ type: OPEN_SNACKBAR, payload });

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });
