const photosHashtag = document.querySelector('.text__hashtags');
const photosDescription = document.querySelector('.text__description');

const validatePhotosHashtags = () => {
  photosHashtag.addEventListener('input', () => {

    const hashtagList = photosHashtag.value.toLowerCase().split('#'); 
    
console.log(hashtagList);

    hashtagList.forEach((hashtag) => { 
      if (hashtag.search(/^#([а-яА-Я\w]{1,20})$/gmi) === -1) { 
        photosHashtag.setCustomValidity('Строка после решётки должна состоять из букв и чисел, длина от 1 до 20 символов')
      }
      else {
        photosHashtag.setCustomValidity('');  
      }
    }); 
  });
};



const validatePhotosDescription = () => {
  photosDescription.addEventListener('invalid', () => {

    if (photosDescription.validity.tooLong) {
      photosDescription.setCustomValidity('Длина комментария не должна превышать 140 символов');
    } 
    else if (photosDescription.validity.valueMissig) {
      photosDescription.setCustomValidity('Обязательное поле');
    } 
    else {
      photosDescription.setCustomValidity('');
    }

  });
};

export {validatePhotosDescription, validatePhotosHashtags};
