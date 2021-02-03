import request from "superagent";
import * as R from "ramda";
import imagesStorage from "../reducers/imagesStorage";

export const fetchImage = async (tagName: string) => {
  // getting one picture
  const { body } = await request.get(
    `https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tagName}`
  );
  return body;
};


