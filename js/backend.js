'use strict';

(function () {
  // Принимает функции успешного выполнения запроса, ошибки запроса и
  // обект XMLHttpRequest.
  var createRequest = function (onSuccess, onError, xhr) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
  };

  // backend.load запрос на загрузку волшебников
  var load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    createRequest(onSuccess, onError, xhr);
    xhr.open('GET', URL);
    xhr.send();
  };

  // backend.save запрос на сохранение формы
  var save = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    createRequest(onSuccess, onError, xhr);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
