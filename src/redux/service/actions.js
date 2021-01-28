import { GET_SERVICE, OPEN_SERVICE_DIALOG, CLOSE_SERVICE_DIALOG } from "./type";

export const getService = (payload) => ({
  type: GET_SERVICE,
  payload,
});

export const openServiceDialog = (payload) => ({
  type: OPEN_SERVICE_DIALOG,
  payload,
});

export const closeServiceDialog = () => ({
  type: CLOSE_SERVICE_DIALOG,
});
