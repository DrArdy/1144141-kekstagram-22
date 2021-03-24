import {openBigPhotosPopup} from './big-picture-block.js';
import {isEscEvent} from './util.js';

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

const renderPictures = (dataList) => {
  const photosListFragment = document.createDocumentFragment();
  
  dataList.forEach((array) => {
    photosListFragment.appendChild(renderPicture(array));
  });

  return photosListFragment;
};

const photosEditorPopupConditionElement = document.querySelector('body');
const photosEditorPopup = document.querySelector('.img-upload__overlay');
const closePhotosEditorButton = photosEditorPopup.querySelector('#upload-cancel');
const zoomInButton = photosEditorPopup.querySelector('.scale__control--bigger');
const zoomOutButton = photosEditorPopup.querySelector('.scale__control--smaller');
const photosPreviewDisplay = photosEditorPopup.querySelector('.img-upload__preview');
const photosPreviewImg = photosPreviewDisplay.children;
photosEditorPopup.querySelector('.scale__control--value').value = 100 + '%';
let scaleValue = 1.00;

const effectsRadioButtons = photosEditorPopup.getElementsByClassName('effects__radio');


const openPhotosEditorPopup = () => {
  photosEditorPopupConditionElement.classList.add('modal-open');
  photosEditorPopup.classList.remove('hidden');
  closePhotosEditorButton.addEventListener('click', closePhotosEditorPopup, false);
  document.addEventListener('keydown', escKeydownEvent);
  zoomInButton.addEventListener('click', increaseScale, false);
  zoomOutButton.addEventListener('click', decreaseScale, false);

};

const closePhotosEditorPopup = () => {
  photosEditorPopup.classList.add('hidden');
  photosEditorPopupConditionElement.classList.remove('modal-open');
};

const escKeydownEvent = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotosEditorPopup();
  }
};

const increaseScale = () => {
  if (scaleValue <= 0.75) {
    scaleValue += 0.25;
    pushPhotosScale();
  }
  else {
    scaleValue = 1.00;
    pushPhotosScale();
  }
};

const decreaseScale = () => {
  if (scaleValue >= 0.5) {
    scaleValue -= 0.25;
    pushPhotosScale();
  }
  else {
    scaleValue = 0.25;
    pushPhotosScale();
  }
};

const pushPhotosScale = () => {
  photosEditorPopup.querySelector('.scale__control--value').value = scaleValue * 100 + '%';
  photosPreviewImg[0].style.transform.value = `scale(${scaleValue})`;
};

const useEffect = (event) => {
  
};

export {renderPictures, openPhotosEditorPopup};
