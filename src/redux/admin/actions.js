import { UNSET_ADMIN, SET_ADMIN } from "./type";

export const loginAdmin = (payload) => ({
  type: SET_ADMIN,
  payload,
});

export const logoutAdmin = () => ({
  type: UNSET_ADMIN,
});
