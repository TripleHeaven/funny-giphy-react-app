import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../../actions";
import image from "../../reducers/image";
import imagesStorage from "../../reducers/imagesStorage";
import { getImageById, getImages, getImagesWithGroups } from "../../selectors";
import Layout from "../layout";
import renderImage from "../pictures";
import ImageDrawer from "../imageDrawer";
import MultiImageDrawer from "../multiImageDrawer";
// import { fetchImage } from "../../api";
export default function ImagesContainer({ imagesObject }) {
  return (
    <div>
      {imagesObject.group}
      <br />
      {/* {imagesObject.images.map((image, indexa) => renderImage(image, indexa))} */}
      <div>
        {imagesObject.images.map((image) =>
          !Array.isArray(image) ? (
            <ImageDrawer
              key={imagesObject.group + image}
              image={image}
            ></ImageDrawer>
          ) : (
            <MultiImageDrawer
              key={imagesObject + image[1]}
              image={image}
            ></MultiImageDrawer>
          )
        )}
      </div>
    </div>
  );
}
