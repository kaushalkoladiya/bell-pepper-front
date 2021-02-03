import { DELETE_VENDOR, GET_VENDOR } from "./type";

export const getVendor = (payload) => ({
  type: GET_VENDOR,
  payload,
});

export const deleteVendor = (payload) => ({
  type: DELETE_VENDOR,
  payload,
});
