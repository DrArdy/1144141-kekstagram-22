import {openBigPhotosPopup} from './big-picture-block.js';
import {getServerData} from './server-interaction.js';

const photosPool = document.querySelector('.pictures');
const picturePopupTemplate = document.querySelector('#picture')
  .content 
  .querySelector('.picture');
const filtersBlock = document.querySelector('.img-filters');
const filterDiscussedButton = filtersBlock.querySelector('#filter-discussed');
const filterRandomButton = filtersBlock.querySelector('#filter-random');
const filterDefaultButton = filtersBlock.querySelector('#filter-default');

const renderPicture = (pictureData) => {
  const picturePopup = picturePopupTemplate.cloneNode(true);
  
  picturePopup.querySelector('.picture__img').src = pictureData.url;
  picturePopup.querySelector('.picture__likes').textContent = pictureData.likes;
  picturePopup.querySelector('.picture__comments').textContent = pictureData.comments.length;
  picturePopup.addEventListener('click', openBigPhotosPopup(pictureData));

  return picturePopup;
};

const renderPictures = (dataList) => {
  const photosListFragment = document.createDocumentFragment();
  
  dataList.forEach((array) => {
    photosListFragment.appendChild(renderPicture(array));
  });
  
  photosPool.appendChild(photosListFragment);
};

const renderPicturesFromServer = () => {
  getServerData().then(
    (dataList) => {
      renderPictures(dataList);
      initFilters(dataList);
    },
  ).catch((error) => {
    alert(error);
  });
};

const initFilters = (dataList) => {
  filtersBlock.classList.remove('img-filters--inactive');
  
  filterDiscussedButton.addEventListener('click', renderByDiscussed(dataList));
  filterRandomButton.addEventListener('click', renderByRandom(dataList));
  filterDefaultButton.addEventListener('click', renderByDefault(dataList));
};

const renderByDiscussed = (dataList)  => () => {
  clearPictures();
  renderPictures(sortByDiscussed(dataList));
};

const renderByDefault = (dataList) => () => {
  clearPictures();
  renderPictures(dataList);
};

const renderByRandom = (dataList) => () => {
  clearPictures();
  renderPictures(shuffleArray(dataList));
};

const clearPictures = () => {
  while (photosPool.firstChild) {
    photosPool.removeChild(photosPool.firstChild);
  }
};

const shuffleArray = (dataList) => {
  for(let i = dataList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random()*(i + 1));
    let temp = dataList[j];
    dataList[j] = dataList[i];
    dataList[i] = temp;
  }
  return dataList;
};

const sortByDiscussed = (dataList) => {
  dataList.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
}

export {renderPicturesFromServer};
