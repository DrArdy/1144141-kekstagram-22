import {MAX_HASHTAGS_QUANTITY} from './constants.js';

const photosHashtag = document.querySelector('.text__hashtags');

const startHashtagsValidation = () => {
  photosHashtag.addEventListener('input', handleValidationEvent);
};

const handleValidationEvent = () => {
  const hashtagList = photosHashtag.value.toLowerCase().split(' '); 

  hashtagList.forEach((hashtag) => { 
    if (/^#([а-яА-Я\w]{1,20})$/gmi.test(hashtag) && hashtagList.length < MAX_HASHTAGS_QUANTITY) { 
      photosHashtag.setCustomValidity('');
      photosHashtag.style.borderColor = '';
    }
    else {
      photosHashtag.setCustomValidity('Строка после решётки должна состоять из букв и чисел, длина от 1 до 20 символов. Максимальное количество хэштегов 5. Хэштеги разделяются пробелом.');
      photosHashtag.style.borderColor = 'red';
    }
  }); 

  photosHashtag.reportValidity();
};

const stopHashtagsValidation = () => {
  photosHashtag.removeEventListener('input', handleValidationEvent);
};

export {startHashtagsValidation, stopHashtagsValidation};
