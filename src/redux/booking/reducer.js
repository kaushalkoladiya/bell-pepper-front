import {
  CLOSE_BOOKING_DIALOG,
  GET_BOOKING,
  OPEN_BOOKING_DIALOG,
  CLOSE_STAFF_ASSIGN_DIALOG,
  OPEN_STAFF_ASSIGN_DIALOG,
  ASSIGN_STAFF,
  DELETE_BOOKING,
  OPEN_VENDOR_ASSIGN_DIALOG,
  CLOSE_VENDOR_ASSIGN_DIALOG,
  ASSIGN_VENDOR,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
  isStaffDialogOpen: false,
  serviceId: null,
  bookingId: null,
  isVendorDialogOpen: false,
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
        vendorId: payload.vendorId,
        bookingId: payload.bookingId,
        isStaffDialogOpen: true,
      };

    case CLOSE_STAFF_ASSIGN_DIALOG:
      return {
        ...state,
        vendorId: null,
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

    case OPEN_VENDOR_ASSIGN_DIALOG:
      return {
        ...state,
        bookingId: payload.bookingId,
        isVendorDialogOpen: true,
      };

    case CLOSE_VENDOR_ASSIGN_DIALOG:
      return {
        ...state,
        bookingId: null,
        isVendorDialogOpen: false,
      };

    case ASSIGN_VENDOR:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === payload.vendorId
            ? {
                ...item,
                vendorId: payload.bookingData.vendorId,
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
