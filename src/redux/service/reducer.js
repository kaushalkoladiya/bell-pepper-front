import {
  ADD_NEW_SERVICE,
  CLEAR_SERVICE_DETAILS,
  CLOSE_SERVICE_DIALOG,
  DELETE_SERVICE,
  GET_SERVICE,
  OPEN_SERVICE_DIALOG,
  TOGGLE_SHOW,
  UPDATE_SERVICE,
  UPDATE_SERVICE_DETAILS,
} from "./type";

const cleaningBookingState = {
  frequency: [],
  hour: [],
  staff: [],
  detail: [],
};

const initialState = {
  data: [],
  dialogId: null,
  isDialogOpen: false,
  cleaning: cleaningBookingState,
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

    case TOGGLE_SHOW:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === payload.id) return { ...item, show: !item.show };
          else return item;
        }),
      };

    case UPDATE_SERVICE_DETAILS:
      if (payload.multiple) {
        return {
          ...state,
          cleaning: {
            ...state.cleaning,
            ...payload.data,
          },
        };
      } else {
        return {
          ...state,
          cleaning: {
            ...state.cleaning,
            [payload.key]: payload.value,
          },
        };
      }

    case CLEAR_SERVICE_DETAILS:
      return {
        ...state,
        cleaning: cleaningBookingState,
      };

    default:
      return state;
  }
};

export default serviceReducer;
