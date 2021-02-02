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

  const fetchNewImageByTag = (stringValue: string) => {
    dispatch(fetchImage(stringValue));
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
          key={image.group}
          imagesObject={image}
        ></ImagesContainer>
      ));
    }
  };
  const renderImage = (image, index) => {
    return (
      <div key={index}>
        {image}
        <img src={image} />
      </div>
    );
  };

  const [groupBy, setGroupBy] = useState(false);

  // useEffect(() => {
  //   setPicAdress(useSelector((state) => getImageById(state, 0)));
  // }, [quantityOfGets]);
  const renderGroups = () => {};
  const handleUploading = (value: string) => {
    const currentValue = value.replace(" ", "");
    if (value.length === 0) {
      alert("Вы ввели пустой запрос!");
    } else if (!currentValue.match(/([A-Za-z,]|[A-Za-z])+/)) {
      alert("Упссс , вы ввели что-то неправильно");
    } else {
      fetchNewImageByTag(currentValue);
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
        {drawImages(groupBy)}
      </div>
    </div>
  );
};

export default connect()(Pictures);

export const renderImage = (image, index) => {
  return (
    <div key={index}>
      {image}
      <img src={image} />
    </div>
  );
};
