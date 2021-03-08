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
  for (i = 1; i <= PHOTOS_QUANTITY; i++) {
    photosIds.push(i);
  }
  return photosIds;
};

const commentIds = [];

const getCommentId = (min, max) => {
  for (i = min; i <= max; i++) {
    const commentId = getRandomNumber(min, max);
    const isUniqueId = commentIds.every((value) => {
      return commentId != value;
    });
    if (isUniqueId == true) {
      commentIds.push(commentId);
      return commentId;
    }
    else {
      continue;
    }
  }
};

const getRandomElement = (elements, lastIndex) => {
  return elements[getRandomNumber(0, lastIndex)];
};

export {getRandomNumber, checkStringLength, getPhotosIdList, getCommentId, getRandomElement};