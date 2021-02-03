import {
  ADD_NEW_SERVICE,
  CLOSE_SERVICE_DIALOG,
  DELETE_SERVICE,
  GET_SERVICE,
  OPEN_SERVICE_DIALOG,
  UPDATE_SERVICE,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SERVICE:
      return { ...state, data: payload };

    case OPEN_SERVICE_DIALOG:
      return { ...state, dialogId: payload || null, isDialogOpen: true };

    case CLOSE_SERVICE_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case ADD_NEW_SERVICE:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case UPDATE_SERVICE:
      return {
        ...state,
        data: state.data.map((poster) => {
          if (poster._id === payload.id) return payload.data;
          else return poster;
        }),
      };

    case DELETE_SERVICE:
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

export default serviceReducer;
