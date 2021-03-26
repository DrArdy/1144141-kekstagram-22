import {showSuccessMessage} from './util.js';

const sendServerData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessMessage();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

const getServerData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((dataList) => {
      onSuccess(dataList);
    });
};




const getData = async () => {
  const response = await fetch('https://22.javascript.pages.academy/kekstagram');
};

export {getServerData, sendServerData};
