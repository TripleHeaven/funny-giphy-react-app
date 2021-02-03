import {
  FETCH_IMAGE_START,
  FETCH_IMAGE_SUCCES,
  FETCH_IMAGE_FAILURE,
  ADD_A_TAG,
  CLEAR_STORAGE,
  MULTI_IMAGE_SUCCES,
  ADD_MULTY_TAGS,
} from "./actionTypes";

import { fetchImage as fetchImageApi } from "../api";

export const cleanStorage = () => (dispatch) => {
  dispatch({
    type: CLEAR_STORAGE,
    payload: "",
  });
};

export const fetchImage = (tagName: Array<string>) => async (dispatch) => {
  // console.log("test");
  dispatch({
    type: FETCH_IMAGE_START,
  });
  try {
    if (tagName.length === 1) {
      const image = await fetchImageApi(tagName[0]);
      if (image.data.length === 0) {
        alert("По Вашему запросу ничего не найдено!");
      } else if (tagName.length == 1) {
        dispatch({
          type: FETCH_IMAGE_SUCCES,
          payload: [image, tagName],
        });
        dispatch({
          type: ADD_A_TAG,
          payload: tagName,
        });
      }
    } else {
      const multiMage = [];
      for (let i = 0; i < tagName.length; i++) {
        console.log("!!!", tagName[i]);
        const imageToAdd = await fetchImageApi(tagName[i]);
        multiMage.push(imageToAdd);
      }
      dispatch({
        type: ADD_MULTY_TAGS,
        payload: tagName,
      });
      dispatch({
        type: MULTI_IMAGE_SUCCES,
        payload: [multiMage, tagName],
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
