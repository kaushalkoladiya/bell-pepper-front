import { GET_BOOKING, OPEN_BOOKING_DIALOG, CLOSE_BOOKING_DIALOG } from "./type";

export const getBooking = (payload) => ({
  type: GET_BOOKING,
  payload,
});

export const openBookingDialog = (payload) => ({
  type: OPEN_BOOKING_DIALOG,
  payload,
});

export const closeBookingDialog = () => ({
  type: CLOSE_BOOKING_DIALOG,
});
