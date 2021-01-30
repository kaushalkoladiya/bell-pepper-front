import {
  GET_BOOKING,
  OPEN_BOOKING_DIALOG,
  CLOSE_BOOKING_DIALOG,
  OPEN_STAFF_ASSIGN_DIALOG,
  CLOSE_STAFF_ASSIGN_DIALOG,
  ASSIGN_STAFF,
} from "./type";

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

export const openStaffDialog = (payload) => ({
  type: OPEN_STAFF_ASSIGN_DIALOG,
  payload,
});

export const assignStaff = (payload) => ({
  type: ASSIGN_STAFF,
  payload,
});

export const closeStaffDialog = () => ({
  type: CLOSE_STAFF_ASSIGN_DIALOG,
});
