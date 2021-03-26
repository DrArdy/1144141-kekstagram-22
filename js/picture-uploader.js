import {isEscEvent, increaseScale, decreaseScale} from './util.js';
import {startHashtagsValidation, stopHashtagsValidation} from './validation.js';

const photosEditorPopupConditionElement = document.querySelector('body');
const photosEditorPopup = document.querySelector('.img-upload__overlay');
const closePhotosEditorButton = photosEditorPopup.querySelector('#upload-cancel');
const zoomInButton = photosEditorPopup.querySelector('.scale__control--bigger');
const zoomOutButton = photosEditorPopup.querySelector('.scale__control--smaller');
const photosPreviewDisplay = photosEditorPopup.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');
const effectsButtons = photosEditorPopup.querySelectorAll('.effects__radio');
const effectsLevelSlider = photosEditorPopup.querySelector('.effect-level__slider');
const effectsLevelField = photosEditorPopup.querySelector('.img-upload__effect-level');
const effectsLevelValue = photosEditorPopup.querySelector('.effect-level__value');
const hashtagField = photosEditorPopup.querySelector('.text__hashtags');
const commentField = photosEditorPopup.querySelector('.text__description');
const submitButton = photosEditorPopup.querySelector('.img-upload__submit');

const openPhotosEditorPopup = () => {
  photosEditorPopupConditionElement.classList.add('modal-open');
  photosEditorPopup.classList.remove('hidden');
  photosEditorPopup.querySelector('.scale__control--value').value = '100%';
  effectsLevelField.classList.add('hidden');
  
  window.noUiSlider.create(effectsLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  closePhotosEditorButton.addEventListener('click', closePhotosEditorPopup);
  document.addEventListener('keydown', closeOnEscKeydown);
  zoomInButton.addEventListener('click', increaseScale);
  zoomOutButton.addEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.addEventListener('change', handleChangeEffects);
  });
  startHashtagsValidation();
  submitButton.addEventListener('click', postForm);
};

const closePhotosEditorPopup = () => {
  photosEditorPopup.classList.add('hidden');
  photosEditorPopupConditionElement.classList.remove('modal-open');
  effectsLevelSlider.noUiSlider.destroy();
  previewImg.className = '';
  previewImg.style.filter = '';
  previewImg.style.transform = '';

  closePhotosEditorButton.removeEventListener('click', closePhotosEditorPopup);
  document.removeEventListener('keydown', closeOnEscKeydown);
  zoomInButton.removeEventListener('click', increaseScale);
  zoomOutButton.removeEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.removeEventListener('change', handleChangeEffects);
  });
  stopHashtagsValidation();
  submitButton.removeEventListener('click', postForm);
};

const closeOnEscKeydown = (event) => {
  if (isEscEvent(event)) {
    event.preventDefault();
    closePhotosEditorPopup();
  }
};

const calculateEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${value})`
    case 'sepia':
      return `sepia(${value})`
    case 'marvin':
      return `invert(${value}%)`
    case 'phobos':
      return `blur(${value}px)`
    case 'heat':
      return `brightness(${value})`
    case 'none':
      return 'none'
  }
};

const setupSliderSettings = (effect) => {
  switch (effect) {
    case 'chrome':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1,
      });
      break
    case 'sepia':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
        start: 1,
      });
      break
    case 'marvin':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 100,
        },
        step: 1,
        start: 100,
      });
      break
    case 'phobos':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 3,
        },
        step: 0.1,
        start: 3,
      });
      break
    case 'heat':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 1,
          'max': 3,
        },
        step: 0.1,
        start: 3,
      });
      break
    case 'none':
      break
  }
};

const handleChangeEffects = (event) => {
  const currentScaleEffect = event.target.value;
  setupSliderSettings(currentScaleEffect);

  if (currentScaleEffect === 'none') {
    effectsLevelField.classList.add('hidden');
    previewImg.style.filter = 'none';
  } 
  else {
    effectsLevelField.classList.remove('hidden');

    effectsLevelSlider.noUiSlider.on('update', (values, handle, unencoded) => {
      effectsLevelValue.value = values[handle];
      previewImg.style.filter = calculateEffect(currentScaleEffect, unencoded[handle]);
    });
  }
  previewImg.className = `effects__preview--${currentScaleEffect}`;
};

const postForm = async () => {
  const response = await fetch('https://22.javascript.pages.academy/kekstagram');
};

export {openPhotosEditorPopup};
