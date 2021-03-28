import {COMMENTS_QUANTITY_STEP, CURRENT_COMMENTS_QUANTITY_INDEX ,TOTAL_COMMENTS_QUANTITY_INDEX} from './constants.js';

const bigPhotosPopup = document.querySelector('.big-picture');
const bigPhotosImgContainer = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosImg = bigPhotosImgContainer.querySelector('img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsPool = bigPhotosPopup.querySelector('.social__comments');
const bigPhotosDescription = bigPhotosPopup.querySelector('.social__caption');
const closeBigPhotosPopupButton = document.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPhotosPopup.querySelector('.social__comments-loader');
const currentBigPhotosCommentsCount = bigPhotosPopup.querySelector('.social__comment-count');
const bodyElement = document.querySelector('body');


const renderPhotosComments = (commentDataElements) => {
  const commentFragment = document.createDocumentFragment();

  commentDataElements.forEach((array) => {
    const newComment = document.createElement('li');
    const commentsAuthorAvatar = document.createElement('img');
    const commentsText = document.createElement('p');
  
    newComment.classList.add('social__comment');
    commentsAuthorAvatar.classList.add('social__picture');
    commentsText.classList.add('social__text');

    commentsAuthorAvatar.src = array.avatar;
    commentsAuthorAvatar.alt = array.name;
    commentsAuthorAvatar.width = 35;
    commentsAuthorAvatar.height = 35;
    commentsText.textContent = array.message;
    commentFragment.appendChild(newComment);
    newComment.appendChild(commentsAuthorAvatar);
    newComment.appendChild(commentsText);
  });

  return commentFragment;
};

const renderBigPhotosPopup = (dataElement) => {
  const totalCommentsCount = dataElement.comments.length;
  bigPhotosImg.src = dataElement.url;
  bigPhotosLikesCount.textContent = dataElement.likes;
  bigPhotosDescription.textContent = dataElement.description;

  let commentsCountArrayFromString = currentBigPhotosCommentsCount.textContent.split(' ');
  commentsCountArrayFromString.splice(TOTAL_COMMENTS_QUANTITY_INDEX, 1, totalCommentsCount.toString());
  currentBigPhotosCommentsCount.textContent = commentsCountArrayFromString.join(' ');
};

const openBigPhotosPopup = (pictureData) => () => {
  let beginIndex = 0;
  let endIndex = COMMENTS_QUANTITY_STEP;
  const pictureCommentsClone = pictureData.comments.slice(0);

  while (bigPhotosCommentsPool.firstChild) {
    bigPhotosCommentsPool.removeChild(bigPhotosCommentsPool.firstChild);
  }

  bodyElement.classList.add('modal-open');
  renderBigPhotosPopup(pictureData);
  bigPhotosPopup.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');

  while (bigPhotosCommentsPool.firstChild) {
    bigPhotosCommentsPool.removeChild(bigPhotosCommentsPool.firstChild);
  }
  bigPhotosCommentsPool.appendChild(renderPhotosComments(pictureCommentsClone.slice(0, COMMENTS_QUANTITY_STEP)));

  const changeCommentsQuantityValue = () => {
    let commentsCountArrayFromString = currentBigPhotosCommentsCount.textContent.split(' ');
    commentsCountArrayFromString[CURRENT_COMMENTS_QUANTITY_INDEX] = bigPhotosPopup.querySelectorAll('.social__comment').length.toString();
    commentsCountArrayFromString[TOTAL_COMMENTS_QUANTITY_INDEX] = pictureData.comments.length.toString();
    currentBigPhotosCommentsCount.textContent = commentsCountArrayFromString.join(' ');
  };
 
  changeCommentsQuantityValue();

  const handleCommentsLoaderClick = () => {
    beginIndex = beginIndex + COMMENTS_QUANTITY_STEP;
    endIndex = endIndex + COMMENTS_QUANTITY_STEP;
    bigPhotosCommentsPool.appendChild(renderPhotosComments(pictureCommentsClone.slice(beginIndex, endIndex)));
    changeCommentsQuantityValue();

    if (endIndex >= pictureCommentsClone.length) {
      commentsLoaderButton.removeEventListener('click', handleCommentsLoaderClick);
      commentsLoaderButton.classList.add('hidden');
    }
  };

  const closeBigPhotosPopup = () => {
    bigPhotosPopup.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    closeBigPhotosPopupButton.removeEventListener('click', closeBigPhotosPopup);
    commentsLoaderButton.removeEventListener('click', handleCommentsLoaderClick);
  };

  commentsLoaderButton.addEventListener('click', handleCommentsLoaderClick);
  closeBigPhotosPopupButton.addEventListener('click', closeBigPhotosPopup);
};

export {openBigPhotosPopup};
