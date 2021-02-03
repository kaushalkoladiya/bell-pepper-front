import { DELETE_VENDOR, GET_VENDOR } from "./type";

const initialState = {
  data: [],
};

const vendorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VENDOR:
      return { ...state, data: payload };

    case DELETE_VENDOR:
      return {
        ...state,
        data: state.data.filter((category) => {
          return category._id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default vendorReducer;
