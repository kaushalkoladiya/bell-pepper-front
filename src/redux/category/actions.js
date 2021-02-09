import {
  GET_CATEGORY,
  OPEN_CATEGORY_DIALOG,
  CLOSE_CATEGORY_DIALOG,
  ADD_NEW_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./type";

export const getCategory = (payload) => ({
  type: GET_CATEGORY,
  payload,
});

export const openCategoryDialog = (payload) => ({
  type: OPEN_CATEGORY_DIALOG,
  payload,
});

export const closeCategoryDialog = () => ({
  type: CLOSE_CATEGORY_DIALOG,
});

export const addNewCategory = (payload) => ({
  type: ADD_NEW_CATEGORY,
  payload,
});

export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload,
});

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload,
});
