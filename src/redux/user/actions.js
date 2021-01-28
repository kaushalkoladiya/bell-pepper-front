import { GET_USERS } from "./type";

export const getUsers = (payload) => ({
  type: GET_USERS,
  payload,
});
