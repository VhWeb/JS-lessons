let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
  function getData() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      request.open('GET', 'js/current.json');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status == 200) { 
          inputUsd.value = inputRub.value / JSON.parse(request.response).usd;
        } else {
          reject();
        }
      }
    })
  }
  getData()
    .catch (() => inputUsd.value = "Что-то пошло не так!")
});