const bigPhotosPopup = document.querySelector('.big-picture');

const bigPhotosUrl = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsCount = bigPhotosPopup.querySelector('.comments-count');
const bigPhotosCommentsPool = bigPhotosPopup.querySelector('.social__comments');
const bigPhotosDescription = bigPhotosPopup.querySelector('.social__caption');
const bigPhotosPopupConditionElement = document.querySelector('body');

const commentFragment = document.createDocumentFragment();

const showPhotosComments = (evt) => {
  const newComment = commentFragment.createElement('li');
  const commentsAuthorAvatar = newComment.createElement('img');
  const commentsText = newComment.createElement('p');
  newComment.classList.add('social__comment');
  commentsAuthorAvatar.classList.add('social__picture');
  commentsText.classList.add('social__text');
  commentsAuthorAvatar.src = evt.url;
  commentsAuthorAvatar.alt = evt.name;
  commentsAuthorAvatar.width = 35;
  commentsAuthorAvatar.height = 35;
  commentsText.textContent = evt.message;
  commentFragment.appendChild(newComment);
};

const openBigPhotosPopup = (evt) => {
  bigPhotosPopupConditionElement.classList.add('modal-open');
  bigPhotosPopup.classList.remove('hidden');
  const currentPhotosSpecification = evt.currentTarget;
  bigPhotosUrl.src = currentPhotosSpecification.url;
  bigPhotosLikesCount.textContent = currentPhotosSpecification.likes;
  bigPhotosCommentsCount.textContent = currentPhotosSpecification.comments.length;
  bigPhotosDescription.textContent = currentPhotosSpecification.description;
  bigPhotosCommentsPool.appendChild(showPhotosComments(evt));
};

const closeBigPhotosPopup = () => {
  bigPhotosPopup.classList.add('hidden');
  bigPhotosPopupConditionElement.classList.remove('modal-open');
};

export {openBigPhotosPopup, closeBigPhotosPopup};