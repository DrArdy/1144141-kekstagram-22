const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const MAX_HASHTAGS_QUANTITY = 5;
const HASHTAG_REGULAR_EXPRESSION = new RegExp(/^#([а-яА-Я\w]{1,20})$/, 'gmi');
const SERVER_SEND_ADRESS = 'https://22.javascript.pages.academy/kekstagram';
const SERVER_GET_ADRESS = 'https://22.javascript.pages.academy/kekstagram/data';
const RANDOM_PHOTOS_QUANTITY = 10;
const FILTER_DELAY = 500;

export {FILTER_DELAY ,RANDOM_PHOTOS_QUANTITY, SERVER_SEND_ADRESS, SERVER_GET_ADRESS ,HASHTAG_REGULAR_EXPRESSION, MAX_HASHTAGS_QUANTITY, SCALE_STEP, SCALE_MAX, SCALE_MIN};
