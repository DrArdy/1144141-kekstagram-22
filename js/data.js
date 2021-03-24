import {getRandomNumber, getPhotosIdList, getCommentId, getRandomElement} from './util.js';
import {PHOTOS_COMMENT_VARIANTS, PHOTOS_DESCRIPTION_LIST, AUTHORS_NAME_VARIANTS} from './constants.js';

const getPhotosComment = () => {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomElement(PHOTOS_COMMENT_VARIANTS, 5),
    name: getRandomElement(AUTHORS_NAME_VARIANTS, 5),
  };
};

const getPhotosCommentList = (quantity) => {
  const commentList = [];
  for (let i = 0; i <= quantity - 1; i++) {
    commentList.push(getPhotosComment());
  }
  return commentList;
};

const getPhotosSpecificationList = () => {
  return getPhotosIdList().map((id) => ({
    id: id,
    url: `photos/${id}.jpg`,
    description: PHOTOS_DESCRIPTION_LIST[id-1],
    likes: getRandomNumber(15, 200),
    comments: getPhotosCommentList(2),
  }))
};

export {getPhotosSpecificationList};
