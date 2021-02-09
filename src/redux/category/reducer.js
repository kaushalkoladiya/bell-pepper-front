import {
  ADD_NEW_CATEGORY,
  CLOSE_CATEGORY_DIALOG,
  DELETE_CATEGORY,
  GET_CATEGORY,
  OPEN_CATEGORY_DIALOG,
  UPDATE_CATEGORY,
} from "./type";

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORY:
      return { ...state, data: payload };

    case OPEN_CATEGORY_DIALOG:
      return { ...state, dialogId: payload || null, isDialogOpen: true };

    case CLOSE_CATEGORY_DIALOG:
      return { ...state, dialogId: null, isDialogOpen: false };

    case ADD_NEW_CATEGORY:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return payload.data;
          else return item;
        }),
      };

    case DELETE_CATEGORY:
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
