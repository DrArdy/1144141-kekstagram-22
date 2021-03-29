const bigPhotosPopup = document.querySelector('.big-picture');
const bigPhotosImgContainer = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosImg = bigPhotosImgContainer.querySelector('img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsCount = bigPhotosPopup.querySelector('.comments-count');
const bigPhotosCommentsPool = bigPhotosPopup.querySelector('.social__comments');
const bigPhotosDescription = bigPhotosPopup.querySelector('.social__caption');
const closeBigPhotosPopupButton = document.querySelector('.big-picture__cancel');
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
  bigPhotosImg.src = dataElement.url;
  bigPhotosLikesCount.textContent = dataElement.likes;
  bigPhotosCommentsCount.textContent = dataElement.comments.length;
  bigPhotosDescription.textContent = dataElement.description;
};

const openBigPhotosPopup = (pictureData) => () => {
  bodyElement.classList.add('modal-open');
  renderBigPhotosPopup(pictureData);
  bigPhotosPopup.classList.remove('hidden');
  while (bigPhotosCommentsPool.firstChild) {
    bigPhotosCommentsPool.removeChild(bigPhotosCommentsPool.firstChild);
  }
  bigPhotosCommentsPool.appendChild(renderPhotosComments(pictureData.comments));
  closeBigPhotosPopupButton.addEventListener('click', closeBigPhotosPopup);
};

const closeBigPhotosPopup = () => {
  bigPhotosPopup.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  closeBigPhotosPopupButton.removeEventListener('click', closeBigPhotosPopup)
};

export {openBigPhotosPopup};
