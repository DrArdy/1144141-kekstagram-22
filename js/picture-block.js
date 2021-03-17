import {getPhotosSpecificationList} from './data.js';
import {openBigPhotosPopup, closeBigPhotosPopup} from './big-picture-block.js';

const photosPool = document.querySelector('.pictures');

const closePhotosPopupElement = document.querySelector('.big-picture__cancel');

const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');

const photosSpecifications = getPhotosSpecificationList();

const similarPhotosFragment = document.createDocumentFragment();

photosSpecifications.forEach(({url, likes, comments}) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  picturePopup.querySelector('.picture__img').src = url;
  picturePopup.querySelector('.picture__likes').textContent = likes;
  picturePopup.querySelector('.picture__comments').textContent = comments.length;
  similarPhotosFragment.appendChild(picturePopup);
});
photosPool.appendChild(similarPhotosFragment);

const addEventListenerByClass = (className, event, fn, container) => {
  const list = container.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
};

const removeEventListenerByClass = (className, event, fn, container) => {
  const list = container.getElementsByClassName(className);
  for (let i = 0, len = list.length; i < len; i++) {
    list[i].removeEventListener(event, fn, false);
  }
};

addEventListenerByClass('picture', 'click', openBigPhotosPopup, photosPool);

removeEventListenerByClass('picture', 'click', openBigPhotosPopup, photosPool);
