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

const PHOTOS_DESCRIPTION_LIST = ['Пляж', 'Указатель', 'Море', 'Девушка с камерой', 'Суп с человечками', 'Крутой автомобиль', 'Клубника на завтрак', 'Морс', 'Гидроплан', 'Обувь', 'Дорожка к морю', 'Ауди', 'Какая-то еда', 'Бутеркот', 'Космотапки', 'Самолет', 'Хор', 'Ретромобиль', 'Тапки фонари', 'Пальмы', 'Завтрак', 'Закат', 'Краб', 'Концерт', 'Бегемот и джип'];

const PHOTOS_COMMENT_VARIANTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const AUTHORS_NAME_VARIANTS = ['Михаил', 'Ульяна', 'Арина', 'Роман', 'Дарья', 'Кирилл'];

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

const getPhotosComment = () => {
  return {
    id: getCommentId(100,999),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomElement(PHOTOS_COMMENT_VARIANTS, 5),
    name: getRandomElement(AUTHORS_NAME_VARIANTS, 5),
  };
};

const getPhotosCommentList = (quantity) => {
  const commentList = [];
  for (i = 0; i <= quantity-1; i++) {
    commentList.push(getPhotosComment());
  }
  return commentList;
};

const getPhotosSpecificationList = () => {
  const photosSpecificationList = [];
  const photosIdList = getPhotosIdList ();
  photosIdList.forEach((value) => {
    photosSpecificationList.push({
      id: value,
      url: `photos/${value}.jpg`,
      description: PHOTOS_DESCRIPTION_LIST[value-1],
      likes: getRandomNumber(15, 200),
      comments: getPhotosCommentList(2),
    });
  });
  return photosSpecificationList;
};