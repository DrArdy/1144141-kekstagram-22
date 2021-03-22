import {openBigPhotosPopup} from './big-picture-block.js';

const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');

const renderPicture = (pictureData) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  
  picturePopup.querySelector('.picture__img').src = pictureData.url;
  picturePopup.querySelector('.picture__likes').textContent = pictureData.likes;
  picturePopup.querySelector('.picture__comments').textContent = pictureData.comments.length;
  picturePopup.addEventListener('click', openBigPhotosPopup(pictureData), false);

  return picturePopup;
};

export {renderPicture};
