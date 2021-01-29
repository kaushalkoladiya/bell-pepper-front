import { CLOSE_BOOKING_DIALOG, GET_BOOKING, OPEN_BOOKING_DIALOG } from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKING:
      return { ...state, data: payload };

    case OPEN_BOOKING_DIALOG:
      return { ...state, dialogId: payload, isDialogOpen: true };

    case CLOSE_BOOKING_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    default:
      return state;
  }
};

export default bookingReducer;
