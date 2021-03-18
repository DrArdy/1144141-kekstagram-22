import {getPhotosSpecificationList} from './data.js';
import {renderPicture, renderPictures, photosPool} from './picture-block.js';
import {renderBigPhotosPopup, bigPhotosPopup} from './big-picture-block.js';

const closePhotosPopupElement = document.querySelector('.big-picture__cancel');

const photosSpecificationList = getPhotosSpecificationList();

const bigPhotosPopupConditionElement = document.querySelector('body');

renderPictures(photosSpecificationList);

const openBigPhotosPopup = (evt) => {
  bigPhotosPopupConditionElement.classList.add('modal-open');
  bigPhotosPopup.classList.remove('hidden');
  removePicturesEventListeners(evt.target);
  renderBigPhotosPopup(evt.target);
  closePhotosPopupElement.addEventListener('click', closeBigPhotosPopup);
};

const closeBigPhotosPopup = () => {
  bigPhotosPopup.classList.add('hidden');
  bigPhotosPopupConditionElement.classList.remove('modal-open');
};

const removePicturesEventListeners = (cb) => {  
  cb.removeEventListener('click', closeBigPhotosPopup, false);
};

photosPool.addEventListener('click', openBigPhotosPopup, false);
