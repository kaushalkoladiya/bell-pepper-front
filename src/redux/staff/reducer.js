import { GET_STAFFS } from "./type";

const initialState = {
  data: [],
};

const staffReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STAFFS:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default staffReducer;
