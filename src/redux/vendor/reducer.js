import { GET_VENDOR } from "./type";

const initialState = {
  data: [],
};

const vendorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VENDOR:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default vendorReducer;
