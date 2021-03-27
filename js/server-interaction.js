import {SERVER_GET_ADRESS, SERVER_SEND_ADRESS} from './constants.js';

const sendServerData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_SEND_ADRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return response.json();
      } else {
        return Promise.reject();
      }
    })
    .catch(() => {
      onFail();
    });
};

const getServerData = (onSuccess) => {
  fetch(SERVER_GET_ADRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((dataList) => {
      onSuccess(dataList);
    })
    .catch((error) => {
      alert(error);
    });
};

export {getServerData, sendServerData};