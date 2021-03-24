import {getPhotosSpecificationList} from './data.js';
import {renderPictures, openPhotosEditorPopup} from './picture-block.js';

const photosPool = document.querySelector('.pictures');

photosPool.appendChild(renderPictures(getPhotosSpecificationList()));

const uploadFileField = document.querySelector('#upload-file');

uploadFileField.addEventListener('change', openPhotosEditorPopup);
