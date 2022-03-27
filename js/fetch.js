const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 1;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getDataFromServer = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось получить объявления. Попробуйте позже!');
      }
    })
    .then((wizards) => {
      onSuccess(wizards);
    })
    .catch(() => showAlert('Не удалось получить объявления. Попробуйте позже!'));
};

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      mode: 'no-cors',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body
    }
  )
    // .then((response) => response.json())
    .then((response) => {
      console.log({ response });
      if (response.ok) {
        onSuccess();
      } else {
        console.log(response.body);
        onFail('response.NotOk');
      }
    })
    .catch((err) => {
      console.log({ err });
      onFail(err.message);
    });
};

export { getDataFromServer, sendDataToServer, showAlert };
