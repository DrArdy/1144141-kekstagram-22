const photosPool = document.querySelector('.pictures');
const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');

const renderPicture = ({url, likes, comments}) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  picturePopup.querySelector('.picture__img').src = url;
  picturePopup.querySelector('.picture__likes').textContent = likes;
  picturePopup.querySelector('.picture__comments').textContent = comments.length;
  return picturePopup;
};

const renderPictures = (dataList) => {
  dataList.forEach(({url, likes, comments}) => {
    photosPool.appendChild(renderPicture({url, likes, comments}));
  });
};

export {renderPicture, renderPictures};
