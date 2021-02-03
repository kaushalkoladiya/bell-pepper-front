import {
  CLOSE_BOOKING_DIALOG,
  GET_BOOKING,
  OPEN_BOOKING_DIALOG,
  CLOSE_STAFF_ASSIGN_DIALOG,
  OPEN_STAFF_ASSIGN_DIALOG,
  ASSIGN_STAFF,
  DELETE_BOOKING,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
  isStaffDialogOpen: false,
  serviceId: null,
  bookingId: null,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKING:
      return { ...state, data: payload };

    case OPEN_BOOKING_DIALOG:
      return { ...state, dialogId: payload, isDialogOpen: true };

    case CLOSE_BOOKING_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case OPEN_STAFF_ASSIGN_DIALOG:
      return {
        ...state,
        serviceId: payload.serviceId,
        bookingId: payload.bookingId,
        isStaffDialogOpen: true,
      };

    case CLOSE_STAFF_ASSIGN_DIALOG:
      return {
        ...state,
        serviceId: null,
        bookingId: null,
        isStaffDialogOpen: false,
      };

    case ASSIGN_STAFF:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === payload.bookingId
            ? {
                ...item,
                profession: payload.bookingData.staffId,
              }
            : item
        ),
      };

    case DELETE_BOOKING:
      return {
        ...state,
        data: state.data.filter((category) => {
          return category._id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default bookingReducer;
