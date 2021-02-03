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
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
  console.log("CURRENTIMAGESOBJECTIN", imagesObject);
  // const renderImage = (image, indexa) => {
  //   console.log(imagesObject);
  //   if (Array.isArray(image)) {
  //     return (
  //       <div>
  //         {image.map((image) => (
  //           <img key={indexa + getRandomInt(0, 500)} src={image}></img>
  //         ))}
  //       </div>
  //     );
  //   } else {
  //     return <img key={getRandomInt(1000, 4000)} src={image}></img>;
  //   }
  // };
  const renderImage = () => {
    console.log(imagesObject);
    for (let i = 0; i < imagesObject.images.length; i++) {
      if (Array.isArray(imagesObject.images[i])) {
        renderMultiImage(imagesObject.images[i]);
      } else {
        renderSingleImage(imagesObject.images[i]);
      }
    }
    return <div>test</div>;
  };
  const renderSingleImage = (image) => {
    return <img src={image[0]}></img>;
  };
  const renderMultiImage = (image) => {
    for (let i = 0; i < image.length; i++) {
      renderSingleImage(image[i]);
    }
  };
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
