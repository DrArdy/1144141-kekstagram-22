import {SCALE_STEP, SCALE_MAX, SCALE_MIN} from './constants.js';

const scaleInput = document.querySelector('.scale__control--value');
const photosPreviewDisplay = document.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');

const checkStringLength = (verifiableString, maxStringLength=140) => verifiableString.length <= maxStringLength;

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const increaseScale = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  
  if (currentScale !== SCALE_MAX) {
    changeScale(currentScale + SCALE_STEP);
  }
};
  
const decreaseScale = () => {
  const currentScale = parseInt(scaleInput.value, 10);
  
  if (currentScale !== SCALE_MIN) {
    changeScale(currentScale - SCALE_STEP);
  }
};
  
const changeScale = (value) => {
  scaleInput.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

export {checkStringLength, isEscEvent, increaseScale, decreaseScale};
