import { SET_ADMIN, SET_ADMIN_DATA, UNSET_ADMIN } from "./type";
import setToken from "../../utils/setToken";
import jwt_decode from "jwt-decode";

const initialState = {
  isAuth: false,
  data: {},
  userType: null,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ADMIN:
      // TODO: check later
      // jwt_decode(payload.token);
      setToken(payload.token);
      localStorage.setItem("userType", payload.userType);
      return { ...state, isAuth: true, userType: payload.userType };

    case SET_ADMIN_DATA:
      return { ...state, data: payload };

    case UNSET_ADMIN:
      setToken();
      localStorage.removeItem("userType");
      return { ...state, data: {}, isAuth: false, userType: null };

    default:
      return state;
  }
};

export default adminReducer;
