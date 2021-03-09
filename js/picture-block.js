import {getPhotosSpecificationList} from './data.js';
const photosPool = document.querySelector('.picture');
const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');
const similarPhotosFragment = document.createDocumentFragment();
const photosSpecifications = getPhotosSpecificationList();
photosSpecifications.forEach(({url, likes, comments}) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  picturePopup.querySelector('.picture__img').src = url;
  picturePopup.querySelector('.picture__likes').textContent = likes;
  picturePopup.querySelector('.picture__comments').textContent = comments;
  similarPhotosFragment.appendChild(picturePopup);
});
photosPool.appendChild(similarPhotosFragment);