const getRandomNumber = (min, max) => {
  if (max > min && min >= 0) {
    return Math.round(Math.random()*(max-min)+min);
  }
  else {
    return 0;
  }
};

const checkStringLength = (verifiableString, maxStringLength=140) => verifiableString.length <= maxStringLength;

const PHOTOS_QUANTITY = 25;

const getPhotosIdList = () => {
  const photosIds = [];
  for (let i = 1; i <= PHOTOS_QUANTITY; i++) {
    photosIds.push(i);
  }
  return photosIds;
};

const commentIds = [];

const getCommentId = () => {
  const [min, max] = [100, 999];
  let commentId = getRandomNumber(min, max);
  while(commentIds.includes(commentId)) {
    commentId = getRandomNumber(min, max);
  }
  commentIds.push(commentId);
  return commentId;
};

const getRandomElement = (elements) => {
  return elements[getRandomNumber(0, elements.length-1)];
};

export {getRandomNumber, checkStringLength, getPhotosIdList, getCommentId, getRandomElement};