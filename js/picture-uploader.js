import {sendServerData} from './server-interaction.js';
import {isEscEvent, increaseScale, decreaseScale} from './util.js';
import {handleValidationEvent} from './validation.js';

const bodyElement = document.querySelector('body');
const photosEditorPopup = document.querySelector('.img-upload__overlay');
const photosInput = document.querySelector('#upload-file');
const closePhotosEditorButton = photosEditorPopup.querySelector('#upload-cancel');
const zoomInButton = photosEditorPopup.querySelector('.scale__control--bigger');
const zoomOutButton = photosEditorPopup.querySelector('.scale__control--smaller');
const photosPreviewDisplay = photosEditorPopup.querySelector('.img-upload__preview');
const previewImg = photosPreviewDisplay.querySelector('img');
const effectsButtons = photosEditorPopup.querySelectorAll('.effects__radio');
const effectsLevelSlider = photosEditorPopup.querySelector('.effect-level__slider');
const effectsLevelField = photosEditorPopup.querySelector('.img-upload__effect-level');
const effectsLevelValue = photosEditorPopup.querySelector('.effect-level__value');
const commentAndHashtagField = document.querySelector('.img-upload__text');
const photosUploadForm = document.querySelector('.img-upload__form');
const photosHashtagsField = photosUploadForm.querySelector('.text__hashtags');
const successMessageTemplate = document.querySelector('#success')
  .content 
  .querySelector('.success');
const failMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const messagePlacement = document.querySelector('main');

const closeOnEscKeydown = (closeHandler) => (event) => {
  if (isEscEvent(event)) {
    event.preventDefault();
    closeHandler();
  }
};

const handleStopPropagation = (event) => event.stopPropagation();

const closePhotosEditorPopup = () => {
  photosEditorPopup.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  effectsLevelSlider.noUiSlider.destroy();
  previewImg.className = '';
  previewImg.style.filter = '';
  previewImg.style.transform = '';
  photosInput.value = '';
  
  closePhotosEditorButton.removeEventListener('click', closePhotosEditorPopup);
  document.removeEventListener('keydown', closeBigPhotosPopupOnEsc);
  zoomInButton.removeEventListener('click', increaseScale);
  zoomOutButton.removeEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.removeEventListener('change', handleChangeEffects);
  });
  commentAndHashtagField.removeEventListener('esc', handleStopPropagation);
  photosHashtagsField.removeEventListener('input', handleValidationEvent);
  photosUploadForm.removeEventListener('submit', handleSubmitEvent);
};

const closeBigPhotosPopupOnEsc = closeOnEscKeydown(closePhotosEditorPopup);

const openPhotosEditorPopup = () => {
  bodyElement.classList.add('modal-open');
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
  document.addEventListener('keydown', closeBigPhotosPopupOnEsc);
  zoomInButton.addEventListener('click', increaseScale);
  zoomOutButton.addEventListener('click', decreaseScale);
  effectsButtons.forEach((button) => {
    button.addEventListener('change', handleChangeEffects);
  });
  commentAndHashtagField.addEventListener('esc', handleStopPropagation);
  photosHashtagsField.addEventListener('input', handleValidationEvent);
  photosUploadForm.addEventListener('submit', handleSubmitEvent);
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
      effectsLevelValue.setAttribute('value', values[handle]);
      previewImg.style.filter = calculateEffect(currentScaleEffect, unencoded[handle]);
    });
  }
  previewImg.className = `effects__preview--${currentScaleEffect}`;
};

const handleSubmitEvent = (event) => {
  event.preventDefault();
  
  sendServerData(
    new FormData(event.target),
  ).then(
    showMessage('success'),
  ).catch(
    showMessage('error'),
  );
};

const showMessage = (type) => () => {
  const template = type === 'success' ? successMessageTemplate : failMessageTemplate;
  const openedMessage = template.cloneNode(true);
  const closeButton = openedMessage.querySelector(`.${type}__button`);

  messagePlacement.appendChild(openedMessage);

  const handleClose = () => {
    messagePlacement.removeChild(openedMessage);

    document.removeEventListener('keydown', closeMessageOnEsc);
    messagePlacement.removeEventListener('click', handleClose);
  };
  const handleCloseClick = (event) => {
    if (event.target === event.currentTarget) handleClose();
  };
  const closeMessageOnEsc = closeOnEscKeydown(handleClose);

  closePhotosEditorPopup();

  closeButton.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', closeMessageOnEsc);
  openedMessage.addEventListener('click', handleCloseClick);
};

const initPictureUploader = () => {
  const uploadFileField = document.querySelector('#upload-file');

  uploadFileField.addEventListener('change', openPhotosEditorPopup);
};

export {initPictureUploader};
