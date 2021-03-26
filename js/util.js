import {SCALE_STEP, SCALE_MAX, SCALE_MIN, PHOTOS_QUANTITY, ALERT_SHOW_TIME} from './constants.js';

const scaleInput = document.querySelector('.scale__control--value');
const photosPreviewDisplay = document.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');
const commentIds = [];
const successMessageTemplate = document.querySelector('#success')
  .content 
  .querySelector('.success');
const messagePlacement = document.querySelector('main');

const getRandomNumber = (min, max) => {
  if (max > min && min >= 0) {
    return Math.round(Math.random()*(max-min)+min);
  }
  else {
    return 0;
  }
};

const checkStringLength = (verifiableString, maxStringLength=140) => verifiableString.length <= maxStringLength;

const getPhotosIdList = () => {
  const photosIds = [];
  for (let i = 1; i <= PHOTOS_QUANTITY; i++) {
    photosIds.push(i);
  }
  return photosIds;
};

const getCommentId = () => {
  const [min, max] = [100, 999];
  let commentId = getRandomNumber(min, max);
  while(commentIds.includes(commentId)) {
    commentId = getRandomNumber(min, max);
  }
  commentIds.push(commentId);
  return commentId;
};

const getRandomElement = (elements) => {
  return elements[getRandomNumber(0, elements.length-1)];
};

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

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  messagePlacement.appendChild(successMessage);
  successMessage.querySelector('.success__button').addEventListener('click', () => {messagePlacement.removeChild(successMessage)});

};

export {showSuccessMessage, showErrorMessage, getRandomNumber, checkStringLength, getPhotosIdList, getCommentId, getRandomElement, isEscEvent, increaseScale, decreaseScale};
