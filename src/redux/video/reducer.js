import {
  ADD_NEW_VIDEO,
  CLOSE_VIDEO_DIALOG,
  DELETE_VIDEO,
  GET_VIDEO,
  OPEN_VIDEO_DIALOG,
  UPDATE_VIDEO,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEO:
      return { ...state, data: payload };

    case OPEN_VIDEO_DIALOG:
      return { ...state, dialogId: payload || null, isDialogOpen: true };

    case CLOSE_VIDEO_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case ADD_NEW_VIDEO:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case UPDATE_VIDEO:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return payload.data;
          else return item;
        }),
      };

    case DELETE_VIDEO:
      return {
        ...state,
        data: state.data.filter((item) => {
          return item._id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default categoryReducer;
