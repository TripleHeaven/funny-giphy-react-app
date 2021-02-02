import {
  FETCH_IMAGE_START,
  FETCH_IMAGE_SUCCES,
  FETCH_IMAGE_FAILURE,
  ADD_A_TAG,
  CLEAR_STORAGE,
} from "./actionTypes";

import { fetchImage as fetchImageApi } from "../api";

export const cleanStorage = () => (dispatch) => {
  dispatch({
    type: CLEAR_STORAGE,
    payload: "",
  });
};

export const fetchImage = (tagName: string) => async (dispatch) => {
  // console.log("test");
  dispatch({
    type: FETCH_IMAGE_START,
  });
  try {
    const image = await fetchImageApi(tagName);
    if (image.data.length === 0) {
      alert("По Вашему запросу ничего не найдено!");
    } else {
      dispatch({
        type: FETCH_IMAGE_SUCCES,
        payload: [image, tagName],
      });
      dispatch({
        type: ADD_A_TAG,
        payload: tagName,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_IMAGE_FAILURE,
      payload: err,
      error: true,
    });
  }
};
