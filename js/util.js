import {SCALE_STEP, SCALE_MAX, SCALE_MIN, ALERT_SHOW_TIME} from './constants.js';

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

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  
  alertContainer.textContent = message;
  
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorMessage, checkStringLength, isEscEvent, increaseScale, decreaseScale};
