import {renderPictures} from './picture-block.js';
import {openPhotosEditorPopup, setPictureUploaderSubmit} from './picture-uploader.js';
import {getServerData} from './server-interaction';

const uploadFileField = document.querySelector('#upload-file');

getServerData((dataList) => {
  console.log(dataList);
  renderPictures(dataList);
});

uploadFileField.addEventListener('change', openPhotosEditorPopup);

setPictureUploaderSubmit();
