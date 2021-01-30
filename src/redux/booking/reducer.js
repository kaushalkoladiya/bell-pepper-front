import {
  CLOSE_BOOKING_DIALOG,
  GET_BOOKING,
  OPEN_BOOKING_DIALOG,
  CLOSE_STAFF_ASSIGN_DIALOG,
  OPEN_STAFF_ASSIGN_DIALOG,
  ASSIGN_STAFF,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
  isBookingDialogOpen: false,
  bookingId: null,
  vendorId: null,
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
        bookingId: payload.bookingId,
        vendorId: payload.vendorId,
        isBookingDialogOpen: true,
      };

    case CLOSE_STAFF_ASSIGN_DIALOG:
      return {
        ...state,
        bookingId: null,
        isBookingDialogOpen: false,
      };

    case ASSIGN_STAFF:
      console.log(payload);
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

    default:
      return state;
  }
};

export default bookingReducer;
