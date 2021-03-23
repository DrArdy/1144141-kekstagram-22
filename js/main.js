import {getPhotosSpecificationList} from './data.js';
import {renderPictures} from './picture-block.js';

const photosPool = document.querySelector('.pictures');

photosPool.appendChild(renderPictures(getPhotosSpecificationList()));
