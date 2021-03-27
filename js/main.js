import {renderPicturesFromServer} from './picture-block.js';
import {openPhotosEditorPopup} from './picture-uploader.js';

const uploadFileField = document.querySelector('#upload-file');

uploadFileField.addEventListener('change', openPhotosEditorPopup);

renderPicturesFromServer();
