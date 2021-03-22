import {getPhotosSpecificationList} from './data.js';
import {renderPicture} from './picture-block.js';

const photosPool = document.querySelector('.pictures');

const renderPictures = (dataList) => {
  const photosListFragment = document.createDocumentFragment();
  dataList.forEach((array) => {
    photosListFragment.appendChild(renderPicture(array));
  });
  return photosListFragment;
};

photosPool.appendChild(renderPictures(getPhotosSpecificationList()));
