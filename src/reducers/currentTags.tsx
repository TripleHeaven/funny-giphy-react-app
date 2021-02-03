import {
  ADD_A_TAG,
  ADD_MULTY_TAGS,
  CLEAR_STORAGE,
  FETCH_IMAGE_SUCCES,
} from "../actions/actionTypes";

import * as R from "ramda";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_A_TAG:
      for (let i = 0; i < state.length; i++) {
        if (JSON.stringify(payload) == JSON.stringify(state[i])) {
          return state;
        }
      }
      return R.append(payload, state);
    case ADD_MULTY_TAGS:
      for (let i = 0; i < state.length; i++) {
        if (JSON.stringify(payload) == JSON.stringify(state[i])) {
          return state;
        }
      }
      return R.append(payload, state);

    case CLEAR_STORAGE:
      return initialState;
    default:
      return state;
  }
};
