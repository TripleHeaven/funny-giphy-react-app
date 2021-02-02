import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../../actions";
import image from "../../reducers/image";
import imagesStorage from "../../reducers/imagesStorage";
import { getImageById, getImages, getImagesWithGroups } from "../../selectors";
import Layout from "../layout";
import renderImage from "../pictures";
// import { fetchImage } from "../../api";
export default function ImagesContainer({ imagesObject }) {
  console.log(imagesObject);
  return (
    <div>
      {imagesObject.group}
      <br />
      {imagesObject.images.map((image, indexa) => (
        <div key={indexa}>
          <img src={image}></img>
        </div>
      ))}
    </div>
  );
}
