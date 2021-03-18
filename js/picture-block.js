const photosPool = document.querySelector('.pictures');
const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');

const renderPicture = (dataElement) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  picturePopup.querySelector('.picture__img').src = dataElement.url;
  picturePopup.querySelector('.picture__likes').textContent = dataElement.likes;
  picturePopup.querySelector('.picture__comments').textContent = dataElement.comments.length;
  return picturePopup;
};

const renderPictures = (dataList) => {
  dataList.forEach((array) => {
    photosPool.appendChild(renderPicture(array));
  });
};

export {renderPicture, renderPictures, photosPool};
