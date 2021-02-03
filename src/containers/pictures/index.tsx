import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { cleanStorage, fetchImage } from "../../actions";
import image from "../../reducers/image";
import imagesStorage from "../../reducers/imagesStorage";
import { getImageById, getImages, getImagesWithGroups } from "../../selectors";
import Layout from "../layout";
import ImagesContainer from "../imagesContainer/";
// import { fetchImage } from "../../api";
const Pictures = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchImage());
  // }, []);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
  const fetchNewImageByTag = (stringValue: string) => {
    const arrayToSend = [];
    arrayToSend.push(stringValue);
    dispatch(fetchImage(arrayToSend));
  };
  const fetchImageByMultipleTags = (tags: Array<string>) => {
    dispatch(fetchImage(tags));
  };

  let images = useSelector((state) => getImages(state));
  let groupImages = useSelector((state) => getImagesWithGroups(state));

  // useEffect(() => {
  //   images = useSelector((state) => getImages(state));
  // }, []);
  console.log("group images", groupImages);
  const drawImages = (groupBy) => {
    if (!groupBy) {
      return images.map((image, indexa) => renderImage(image, indexa));
    } else {
      return groupImages.map((image, indexa) => (
        <ImagesContainer
          key={indexa + getRandomInt(8000, 10000)}
          imagesObject={image}
        ></ImagesContainer>
      ));
    }
  };
  const renderImage = (image, index) => {
    return (
      <div key={getRandomInt(1000, 5000)}>
        {image}
        <img src={image} />
      </div>
    );
  };

  const [groupBy, setGroupBy] = useState(false);

  // useEffect(() => {
  //   setPicAdress(useSelector((state) => getImageById(state, 0)));
  // }, [quantityOfGets]);
  const handleUploading = (value: string) => {
    const currentValue = value.replace(" ", "");
    if (value.length === 0) {
      alert("Вы ввели пустой запрос!");
    } else if (!currentValue.match(/([A-Za-z,]|[A-Za-z])+/)) {
      alert("Упссс , вы ввели что-то неправильно");
    } else if (value.split(",").length === 1) {
      fetchNewImageByTag(currentValue);
    } else {
      fetchImageByMultipleTags(value.split(","));
    }
  };
  const [textInputState, setTextInputState] = useState("");
  const handleInputChange = (value: string) => {
    value = value.replace(/[^A-Za-z,]/, "");
    setTextInputState(value);
  };
  return (
    <div>
      <input
        id="inputThing"
        value={textInputState}
        onChange={(event) => handleInputChange(event.target.value)}
      ></input>
      <button onClick={(event) => handleUploading(textInputState)}>
        GetNewPic
      </button>
      {/* {imagesStorage.length ? (
        images.map((image, index) => renderImage(image, index))
      ) : (
        <div>none</div>
      )} */}
      <button className="groupButton" onClick={() => setGroupBy(!groupBy)}>
        {!groupBy ? "Группировать" : "Разгруппировать"}
      </button>

      <button className="unGroupButton">Разгруппировать</button>
      <button className="clearButton" onClick={() => dispatch(cleanStorage())}>
        Clear
      </button>
      <div className="testtesttest">
        {" "}
        Test{" "}
        {/* {!groupBy ? (
          images.map((image, indexa) => renderImage(image, indexa))
        ) : (
          <div>notGroupBy</div>
        )} */}
        {!groupBy
          ? images.map((image, indexa) => renderImage(image, indexa))
          : groupImages.map((image) => (
              <ImagesContainer
                key={image.group}
                imagesObject={image}
              ></ImagesContainer>
            ))}
      </div>
    </div>
  );
};

export default connect()(Pictures);
