import {
  ADD_NEW_BANNER,
  CLOSE_BANNER_DIALOG,
  DELETE_BANNER,
  GET_BANNER,
  OPEN_BANNER_DIALOG,
  TOGGLE_IS_LIVE,
  TOGGLE_SHOW,
} from "./type";

const initialState = {
  data: [],
  isDialogOpen: false,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BANNER:
      return { ...state, data: payload };

    case OPEN_BANNER_DIALOG:
      return { ...state, isDialogOpen: true };

    case CLOSE_BANNER_DIALOG:
      return { ...state, isDialogOpen: false };

    case ADD_NEW_BANNER:
      const data = [...state.data];
      data.unshift(payload);
      return {
        ...state,
        data,
      };

    case DELETE_BANNER:
      return {
        ...state,
        data: state.data.filter((item) => {
          return item._id !== payload;
        }),
      };

    case TOGGLE_IS_LIVE:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return { ...item, isLive: !item.isLive };
          else return item;
        }),
      };

    case TOGGLE_SHOW:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return { ...item, show: !item.show };
          else return item;
        }),
      };

    default:
      return state;
  }
};

export default categoryReducer;
