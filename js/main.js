import {getPhotosSpecificationList} from './data.js';
import {renderPictures} from './picture-block.js';
import {openPhotosEditorPopup} from './picture-uploader.js';

const photosPool = document.querySelector('.pictures');

photosPool.appendChild(renderPictures(getPhotosSpecificationList()));

const uploadFileField = document.querySelector('#upload-file');

uploadFileField.addEventListener('change', openPhotosEditorPopup);
