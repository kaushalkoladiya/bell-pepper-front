import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./type";

const initialState = {
  isSnackOpen: false,
  type: "success" || "error",
  message: "",
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        isSnackOpen: true,
        type: payload.type,
        message: payload.message || "Unknown error!",
      };

    case CLOSE_SNACKBAR:
      return { ...state, isSnackOpen: false };

    default:
      return state;
  }
};

export default uiReducer;
