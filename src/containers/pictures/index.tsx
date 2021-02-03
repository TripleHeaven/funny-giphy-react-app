import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { cleanStorage, fetchImage } from "../../actions";
import image from "../../reducers/image";
import imagesStorage from "../../reducers/imagesStorage";
import { getImageById, getImages, getImagesWithGroups } from "../../selectors";
import Layout from "../layout";
import ImagesContainer from "../imagesContainer/";
import styles from "./styles.scss";
import ImageDrawer from "../imageDrawer";
import MultiImageDrawer from "../multiImageDrawer";
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

  const renderImage = (image, index) => {
    return (
      <div class="image" key={getRandomInt(1000, 5000)}>
        <img src={image} />
      </div>
    );
  };
  const [groupBy, setGroupBy] = useState(false);
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
    <div className={styles.main__container}>
      <div className={styles.control__container}>
        <input
          id="inputThing"
          value={textInputState}
          onChange={(event) => handleInputChange(event.target.value)}
        ></input>
        <button
          className={styles.btn__load}
          onClick={(event) => handleUploading(textInputState)}
        >
          Загрузить
        </button>
        <button
          className={!groupBy ? styles.btn__group : styles.btn__ungroup}
          onClick={() => setGroupBy(!groupBy)}
        >
          {!groupBy ? "Группировать" : "Разгруппировать"}
        </button>
        <button
          className={styles.btn__delete}
          onClick={() => dispatch(cleanStorage())}
        >
          Clear
        </button>
      </div>
      <div className={styles.images__main__container}>
        {!groupBy ? (
          <h1 className={styles.allTags}>All Tags</h1>
        ) : (
          <h1 className={styles.allTags}>Groups</h1>
        )}
        {!groupBy
          ? images.map((image, indexa) =>
              !Array.isArray(image) ? (
                <ImageDrawer key={image + indexa} image={image}></ImageDrawer>
              ) : (
                <MultiImageDrawer
                  key={image + indexa}
                  image={image}
                ></MultiImageDrawer>
              )
            )
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
