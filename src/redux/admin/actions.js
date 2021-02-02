import { UNSET_ADMIN, SET_ADMIN, SET_ADMIN_DATA } from "./type";

export const loginAdmin = (payload) => ({
  type: SET_ADMIN,
  payload,
});

export const setAdminData = (payload) => ({
  type: SET_ADMIN_DATA,
  payload,
});

export const logoutAdmin = () => ({
  type: UNSET_ADMIN,
});
