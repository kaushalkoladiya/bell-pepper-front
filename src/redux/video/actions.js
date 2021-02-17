import {
  GET_VIDEO,
  OPEN_VIDEO_DIALOG,
  CLOSE_VIDEO_DIALOG,
  ADD_NEW_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
} from "./type";

export const getVideo = (payload) => ({
  type: GET_VIDEO,
  payload,
});

export const openVideoDialog = (payload) => ({
  type: OPEN_VIDEO_DIALOG,
  payload,
});

export const closeVideoDialog = () => ({
  type: CLOSE_VIDEO_DIALOG,
});

export const addNewVideo = (payload) => ({
  type: ADD_NEW_VIDEO,
  payload,
});

export const updateVideo = (payload) => ({
  type: UPDATE_VIDEO,
  payload,
});

export const deleteVideo = (payload) => ({
  type: DELETE_VIDEO,
  payload,
});
