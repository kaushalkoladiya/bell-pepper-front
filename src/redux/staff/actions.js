import {
  ADD_NEW_STAFF,
  CLOSE_STAFF_DIALOG,
  DELETE_STAFF,
  GET_STAFF,
  OPEN_STAFF_DIALOG,
  UPDATE_STAFF,
} from "./type";

export const getStaffs = (payload) => ({
  type: GET_STAFF,
  payload,
});

export const openStaffDialog = (payload) => ({
  type: OPEN_STAFF_DIALOG,
  payload,
});

export const closeStaffDialog = () => ({
  type: CLOSE_STAFF_DIALOG,
});

export const addNewStaff = (payload) => ({
  type: ADD_NEW_STAFF,
  payload,
});

export const updateStaff = (payload) => ({
  type: UPDATE_STAFF,
  payload,
});

export const deleteStaff = (payload) => ({
  type: DELETE_STAFF,
  payload,
});
