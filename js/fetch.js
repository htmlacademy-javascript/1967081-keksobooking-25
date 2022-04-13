import { failLoadDataFromServer } from './validation-forms.js';

const TEXT_ERROR_GETDATA = 'Не удалось загрузить объявления!';

const loadDataFromServer = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((announcements) => {
      onSuccess(announcements);
    })
    .catch(() => failLoadDataFromServer(TEXT_ERROR_GETDATA));
};

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { loadDataFromServer, sendDataToServer};
