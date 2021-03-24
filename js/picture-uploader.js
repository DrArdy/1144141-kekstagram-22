import {isEscEvent} from './util.js';

const photosEditorPopupConditionElement = document.querySelector('body');
const photosEditorPopup = document.querySelector('.img-upload__overlay');
const closePhotosEditorButton = photosEditorPopup.querySelector('#upload-cancel');
const zoomInButton = photosEditorPopup.querySelector('.scale__control--bigger');
const zoomOutButton = photosEditorPopup.querySelector('.scale__control--smaller');
const photosPreviewDisplay = photosEditorPopup.querySelector('.img-upload__preview');
const scaleInput = photosEditorPopup.querySelector('.scale__control--value');
const previewImg = photosPreviewDisplay.querySelector('img');
const effectsButtons = photosEditorPopup.querySelectorAll('.effects__radio');
const effectsLevelSlider = photosEditorPopup.querySelector('.effect-level__slider');
const effectsLevelField = photosEditorPopup.querySelector('.img-upload__effect-level');
const effectsLevelValue = photosEditorPopup.querySelector('.effect-level__value');
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

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
  });

  closePhotosEditorButton.addEventListener('click', closePhotosEditorPopup);
  document.addEventListener('keydown', escKeydownEvent);
  zoomInButton.addEventListener('click', increaseScale);
  zoomOutButton.addEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.addEventListener('change', handleChangeEffects);
  });
};

const closePhotosEditorPopup = () => {
  photosEditorPopup.classList.add('hidden');
  photosEditorPopupConditionElement.classList.remove('modal-open');
  effectsLevelSlider.noUiSlider.destroy();
  previewImg.className = 'none';
};

const escKeydownEvent = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotosEditorPopup();
  }
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

const calculateEffect = (effect, value) => {
  switch (effect) {
    case 'grayscale':
      return `grayscale(${value})`
    case 'sepia':
      return `sepia(${value})`
    case 'invert':
      return `invert(${value}%)`
    case 'blur':
      return `blur(${value}px)`
    case 'brightness':
      return `brightness(${value})`
    case 'none':
      return 'none'
  }
};

const setupSliderSettings = (effect) => {
  switch (effect) {
    case 'grayscale':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
      });
      break
    case 'sepia':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 1,
        },
        step: 0.1,
      });
      break
    case 'invert':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 100,
        },
        step: 1,
      });
      break
    case 'blur':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': 3,
        },
        step: 0.1,
      });
      break
    case 'brightness':
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          'min': 1,
          'max': 3,
        },
        step: 0.1,
      });
      break
    case 'none':
      break
  }
};

const handleChangeEffects = (event) => {
  const currentScaleEffect = event.target.value;

  if (currentScaleEffect === 'none') {
    // Скрыть слайдер
    effectsLevelField.classList.add('hidden');
    previewImg.style.filter = 'none';
  } 
  else {
    // Показать слайдер
    effectsLevelField.classList.remove('hidden');
    setupSliderSettings(currentScaleEffect);

    effectsLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
      effectsLevelValue.value = unencoded[handle];
      previewImg.style.filter = calculateEffect(currentScaleEffect, effectsLevelValue.value);
      console.log(previewImg.style.filter);
      
    });
  }
  previewImg.className = `effects__preview--${currentScaleEffect}`;
};

export {openPhotosEditorPopup};
