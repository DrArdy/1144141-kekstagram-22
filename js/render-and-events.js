import {getPhotosSpecificationList} from './data.js';
import {renderPicture, renderPictures, photosPool} from './picture-block.js';
import {openBigPhotosPopup, closeBigPhotosPopup} from './big-picture-block.js';

const closePhotosPopupElement = document.querySelector('.big-picture__cancel');

renderPictures(getPhotosSpecificationList());

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
