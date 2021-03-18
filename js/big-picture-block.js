const bigPhotosPopup = document.querySelector('.big-picture');
const bigPhotosUrl = bigPhotosPopup.querySelector('.big-picture__img');
const bigPhotosLikesCount = bigPhotosPopup.querySelector('.likes-count');
const bigPhotosCommentsCount = bigPhotosPopup.querySelector('.comments-count');
const bigPhotosCommentsPool = bigPhotosPopup.querySelector('.social__comments');
const bigPhotosDescription = bigPhotosPopup.querySelector('.social__caption');

const renderPhotosComments = (commentDataElement) => {
  const commentFragment = document.createDocumentFragment();
  const newComment = document.createElement('li');
  const commentsAuthorAvatar = document.createElement('img');
  const commentsText = document.createElement('p');
  newComment.classList.add('social__comment');
  commentsAuthorAvatar.classList.add('social__picture');
  commentsText.classList.add('social__text');
  commentsAuthorAvatar.src = commentDataElement.url;
  commentsAuthorAvatar.alt = commentDataElement.name;
  commentsAuthorAvatar.width = 35;
  commentsAuthorAvatar.height = 35;
  commentsText.textContent = commentDataElement.message;
  commentFragment.appendChild(newComment);
  newComment.appendChild(commentsAuthorAvatar);
  newComment.appendChild(commentsText);
  return commentFragment;
};

const renderBigPhotosPopup = (dataElement) => {
  bigPhotosUrl.src = dataElement.url;
  bigPhotosLikesCount.textContent = dataElement.likes;
  bigPhotosCommentsCount.textContent = dataElement.comments.length;
  bigPhotosDescription.textContent = dataElement.description;
  bigPhotosCommentsPool.appendChild(renderPhotosComments(dataElement.comments));
};

export {renderBigPhotosPopup, bigPhotosPopup};
