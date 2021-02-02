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
      if (state.imagesStorage[j].tag === groups[i]) {
        groupsImages[i].images.push(getImageById(state, j));
      }
    }
  }
  return groupsImages;
};

export const getImageById = (state, id) => {
  for (let i = 0; i < state.imagesStorage.length; i++) {
    if (state.imagesStorage[i].id === id) {
      return state.imagesStorage[i].data.image_url;
    }
  }
  return null;
};

//
