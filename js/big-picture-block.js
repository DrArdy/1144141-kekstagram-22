import {renderPhotosList, photosPool} from './picture-block.js';
const bigPhotosPopup = document.querySelector('.big-picture');
const bigPhotosUrl = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsCount = bigPhotosPopup.querySelector('.comments-count');
const closePhotosPopupButton = document.querySelector('.big-picture__cancel');
photosPool.addEventListener('click', () => {
  bigPhotosPopup.classList.remove('hidden');
  bigPhotosUrl.src = renderPhotosList.url;
  bigPhotosLikesCount.textContent = renderPhotosList.likes;
  bigPhotosCommentsCount.textContent = renderPhotosList.comments;
});
closePhotosPopupButton.addEventListener('click', () => {
  bigPhotosPopup.classList.add('hidden');
})