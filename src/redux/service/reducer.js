import { CLOSE_SERVICE_DIALOG, GET_SERVICE, OPEN_SERVICE_DIALOG } from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SERVICE:
      return { ...state, data: payload };

    case OPEN_SERVICE_DIALOG:
      return { ...state, dialogId: payload, isDialogOpen: true };

    case CLOSE_SERVICE_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    default:
      return state;
  }
};

export default serviceReducer;
