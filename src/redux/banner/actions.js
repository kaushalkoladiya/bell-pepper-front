import {
  GET_BANNER,
  OPEN_BANNER_DIALOG,
  CLOSE_BANNER_DIALOG,
  ADD_NEW_BANNER,
  DELETE_BANNER,
  TOGGLE_SHOW,
  TOGGLE_IS_LIVE,
} from "./type";

export const getBanner = (payload) => ({
  type: GET_BANNER,
  payload,
});

export const openBannerDialog = () => ({
  type: OPEN_BANNER_DIALOG,
});

export const closeBannerDialog = () => ({
  type: CLOSE_BANNER_DIALOG,
});

export const addNewBanner = (payload) => ({
  type: ADD_NEW_BANNER,
  payload,
});

export const deleteBanner = (payload) => ({
  type: DELETE_BANNER,
  payload,
});

export const toggleShow = (payload) => ({
  type: TOGGLE_SHOW,
  payload,
});

export const toggleIsLive = (payload) => ({
  type: TOGGLE_IS_LIVE,
  payload,
});
