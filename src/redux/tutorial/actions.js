import {
  GET_TUTORIAL,
  OPEN_TUTORIAL_DIALOG,
  CLOSE_TUTORIAL_DIALOG,
  ADD_NEW_TUTORIAL,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
} from "./type";

export const getTutorial = (payload) => ({
  type: GET_TUTORIAL,
  payload,
});

export const openTutorialDialog = (payload) => ({
  type: OPEN_TUTORIAL_DIALOG,
  payload,
});

export const closeTutorialDialog = () => ({
  type: CLOSE_TUTORIAL_DIALOG,
});

export const addNewTutorial = (payload) => ({
  type: ADD_NEW_TUTORIAL,
  payload,
});

export const updateTutorial = (payload) => ({
  type: UPDATE_TUTORIAL,
  payload,
});

export const deleteTutorial = (payload) => ({
  type: DELETE_TUTORIAL,
  payload,
});
