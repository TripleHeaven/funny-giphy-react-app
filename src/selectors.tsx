import * as R from "ramda";

export const getImages = (state) => {
  console.log(state.imagesStorage);
  // let images = [];

  const images = [];
  for (let i = 0; i < state.imagesStorage.length; i++) {
    images.push(getImageById(state, i));
  }

  console.log("imgaes ", images);
  return images;
};

export const getImagesWithGroups = (state) => {
  // getting groups
  let groups = state.currentTags;
  // getting images for groups
  let groupsImages = [];
  for (let i = 0; i < groups.length; i++) {
    groupsImages.push({ group: groups[i], images: [] });
    for (let j = 0; j < state.imagesStorage.length; j++) {
      if (
        JSON.stringify(state.imagesStorage[j].tag) === JSON.stringify(groups[i])
      ) {
        groupsImages[i].images.push(
          getImageById(state, state.imagesStorage[j].id)
        );
      }
    }
  }
  console.log("CURRENTTEST", groupsImages);
  return groupsImages;
};

export const getImageById = (state, id) => {
  for (let k = 0; k < state.imagesStorage.length; k++) {
    if (state.imagesStorage[k].multi && state.imagesStorage[k].id === id) {
      const toReturn = [];
      for (let l = 0; l < state.imagesStorage[k].multi.length; l++) {
        toReturn.push(state.imagesStorage[k].multi[l].data.image_url);
      }
      return toReturn;
    } else if (state.imagesStorage[k].id === id) {
      return state.imagesStorage[k].data.image_url;
    }
  }
  return null;
};

//
