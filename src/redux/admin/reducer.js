import { SET_ADMIN, UNSET_ADMIN } from "./type";
import setToken from "../../utils/setToken";
import jwt_decode from "jwt-decode";

const initialState = {
  isAuth: false,
  data: {},
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ADMIN:
      // TODO: check later
      // jwt_decode(payload.token);
      setToken(payload);
      return { ...state, isAuth: true };

    case UNSET_ADMIN:
      setToken();
      return { ...state, data: {}, isAuth: false };

    default:
      return state;
  }
};

export default adminReducer;
