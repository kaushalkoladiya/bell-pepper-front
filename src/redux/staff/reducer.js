import {
  ADD_NEW_STAFF,
  CLOSE_STAFF_DIALOG,
  DELETE_STAFF,
  GET_STAFF,
  OPEN_STAFF_DIALOG,
  UPDATE_STAFF,
} from "./type";

const initialState = {
  data: [],
};

const staffReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STAFF:
      return { ...state, data: payload };

    case OPEN_STAFF_DIALOG:
      return { ...state, dialogId: payload || null, isDialogOpen: true };

    case CLOSE_STAFF_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case ADD_NEW_STAFF:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case UPDATE_STAFF:
      return {
        ...state,
        data: state.data.map((poster) => {
          if (poster._id === payload.id) return payload.data;
          else return poster;
        }),
      };

    case DELETE_STAFF:
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

export default staffReducer;
