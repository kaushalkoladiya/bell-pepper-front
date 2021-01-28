import { GET_USERS } from "./type";

const initialState = {
  data: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default userReducer;
