import {SCALE_STEP, SCALE_MAX, SCALE_MIN, PHOTOS_QUANTITY} from './constants.js';

const scaleInput = document.querySelector('.scale__control--value');
const photosPreviewDisplay = document.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');
const commentIds = [];

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

export {getRandomNumber, checkStringLength, getPhotosIdList, getCommentId, getRandomElement, isEscEvent, increaseScale, decreaseScale};
