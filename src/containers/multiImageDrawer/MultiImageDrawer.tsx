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
export default function MultiImageDrawer({ image }) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

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

  const renderSingleImage = (image) => {
    return (
      <div>
        <img src={image[0]}></img>
      </div>
    );
  };
  const renderMultiImage = (image) => {
    for (let i = 0; i < image.length; i++) {
      renderSingleImage(image[i]);
    }
  };
  return (
    <div>
      {image.map((image) => (
        <img key={image} src={image}></img>
      ))}
    </div>
  );
}
