import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import image from "./image";
import imagesStorage from "./imagesStorage";
import currentTags from "./currentTags";
// import imagesPage from "./imagesPage";
export default (history) =>
  combineReducers({
    imagesStorage,
    currentTags,
    router: connectRouter(history),
  });
