import {
  GET_SERVICE,
  OPEN_SERVICE_DIALOG,
  CLOSE_SERVICE_DIALOG,
  ADD_NEW_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  TOGGLE_SHOW,
  UPDATE_SERVICE_DETAILS,
  CLEAR_SERVICE_DETAILS,
} from "./type";

export const getService = (payload) => ({ type: GET_SERVICE, payload });

export const openServiceDialog = (payload) => ({
  type: OPEN_SERVICE_DIALOG,
  payload,
});

export const closeServiceDialog = () => ({ type: CLOSE_SERVICE_DIALOG });

export const addNewService = (payload) => ({ type: ADD_NEW_SERVICE, payload });

export const updateService = (payload) => ({ type: UPDATE_SERVICE, payload });

export const deleteService = (payload) => ({ type: DELETE_SERVICE, payload });

export const toggleShow = (payload) => ({ type: TOGGLE_SHOW, payload });

export const updateServiceDetails = (payload) => ({
  type: UPDATE_SERVICE_DETAILS,
  payload,
});

export const clearServiceDetails = () => ({ type: CLEAR_SERVICE_DETAILS });
