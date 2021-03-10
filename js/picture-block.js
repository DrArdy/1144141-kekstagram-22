import {getPhotosSpecificationList} from './data.js';
const photosPool = document.querySelector('.picture');
const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');
const photosSpecifications = getPhotosSpecificationList();
const renderPhotosList = () => {
  const similarPhotosFragment = document.createDocumentFragment();
  photosSpecifications.forEach(({url, likes, comments}) => {
    const picturePopup = picturePopupTemplate.cloneNode(true);
    picturePopup.querySelector('.picture__img').src = url;
    picturePopup.querySelector('.picture__likes').textContent = likes;
    picturePopup.querySelector('.picture__comments').textContent = comments;
    similarPhotosFragment.appendChild(picturePopup);
  });
  photosPool.appendChild(similarPhotosFragment);
};
export {renderPhotosList, photosPool};