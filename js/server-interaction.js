import {SERVER_GET_ADRESS, SERVER_SEND_ADRESS} from './constants.js';

const sendServerData = (body) => {
  return fetch(
    SERVER_SEND_ADRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject();
      }
    })
};

const getServerData = () => {
  return fetch(SERVER_GET_ADRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        Promise.reject(`${response.status} ${response.statusText}`);
      }
    })
};

export {getServerData, sendServerData};
