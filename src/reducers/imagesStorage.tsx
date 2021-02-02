import {
  CLEAR_STORAGE,
  FETCH_IMAGE_FAILURE,
  FETCH_IMAGE_SUCCES,
} from "../actions/actionTypes";

import * as R from "ramda";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_IMAGE_SUCCES:
      const key = "id";
      // assigning an id
      const newValue = R.assoc("id", state.length, payload[0]);
      const newNewValue = R.assoc("tag", payload[1], newValue);

      return R.append(newNewValue, state);
    case CLEAR_STORAGE:
      return initialState;
    case FETCH_IMAGE_FAILURE:
      alert("Произошла http ошибка!");
      return state;
    default:
      return state;
  }
};
