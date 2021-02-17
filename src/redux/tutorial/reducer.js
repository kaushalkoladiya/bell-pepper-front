import {
  ADD_NEW_TUTORIAL,
  CLOSE_TUTORIAL_DIALOG,
  DELETE_TUTORIAL,
  GET_TUTORIAL,
  OPEN_TUTORIAL_DIALOG,
  UPDATE_TUTORIAL,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TUTORIAL:
      return { ...state, data: payload };

    case OPEN_TUTORIAL_DIALOG:
      return { ...state, dialogId: payload || null, isDialogOpen: true };

    case CLOSE_TUTORIAL_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case ADD_NEW_TUTORIAL:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case UPDATE_TUTORIAL:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return payload.data;
          else return item;
        }),
      };

    case DELETE_TUTORIAL:
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
