const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const MAX_HASHTAGS_QUANTITY = 5;
const RANDOM_PHOTOS_QUANTITY = 10;
const FILTER_DELAY = 500;
const COMMENTS_QUANTITY_STEP = 5;
const SERVER_SEND_URL = 'https://22.javascript.pages.academy/kekstagram';
const SERVER_GET_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_REGEXP = new RegExp(/^#([а-яА-Я\w]{1,20})$/);

export {HASHTAG_REGEXP, FILE_TYPES, COMMENTS_QUANTITY_STEP, FILTER_DELAY, RANDOM_PHOTOS_QUANTITY, SERVER_SEND_URL, SERVER_GET_URL, MAX_HASHTAGS_QUANTITY, SCALE_STEP, SCALE_MAX, SCALE_MIN};
