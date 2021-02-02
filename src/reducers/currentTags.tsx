import {
  ADD_A_TAG,
  CLEAR_STORAGE,
  FETCH_IMAGE_SUCCES,
} from "../actions/actionTypes";

import * as R from "ramda";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_A_TAG:
      if (state.indexOf(payload) === -1) {
        return R.append(payload, state);
      }
      return state;
    case CLEAR_STORAGE:
      return initialState;
    default:
      return state;
  }
};
