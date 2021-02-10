import {
  GET_BOOKING,
  OPEN_BOOKING_DIALOG,
  CLOSE_BOOKING_DIALOG,
  OPEN_STAFF_ASSIGN_DIALOG,
  CLOSE_STAFF_ASSIGN_DIALOG,
  ASSIGN_STAFF,
  DELETE_BOOKING,
  OPEN_VENDOR_ASSIGN_DIALOG,
  ASSIGN_VENDOR,
  CLOSE_VENDOR_ASSIGN_DIALOG,
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

export const openVendorDialog = (payload) => ({
  type: OPEN_VENDOR_ASSIGN_DIALOG,
  payload,
});

export const assignVendor = (payload) => ({
  type: ASSIGN_VENDOR,
  payload,
});

export const closeVendorDialog = () => ({
  type: CLOSE_VENDOR_ASSIGN_DIALOG,
});

export const deleteBooking = (payload) => ({
  type: DELETE_BOOKING,
  payload,
});
