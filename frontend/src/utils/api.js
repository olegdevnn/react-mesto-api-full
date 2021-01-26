/**
 * Url api
 * @type {string}
 */

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const badStatus = (statusRes, statusMust) => `Не верный статус ответа (${statusRes} != ${statusMust})`;

/**
 * Класс для работы с api сервера проекта 'Место'
 * Результат ответа зависит от запросов или сообщение об ошибке
 */
class api {
  /**
   * Создать Api
   * @param {object} config - Данные (baseUrl - url сервера, headers - заголовки)
   */
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = new Headers(config.headers);
    this.headerWithContentType = new Headers(config.headers);
    this.headerWithContentType.append('Content-Type', 'application/json');
  }

  /**
   * Возвращает cookies csrf
   * @returns {Promise} - Промис объект с пустым телом
   */
  getToken() {
    return fetch(`${this.baseUrl}/getToken`, {
      method: 'GET',
      headers: new Headers(this.headers),
      credentials: 'include',
    });
  }

  /**
   * Регистрация пользователя
   * @param {object} data - данные (email, password)
   * @returns {Promise} - Промис объект с данными пользователя
   */
  register({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headerWithContentType,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then((res) => api.checkStatus(res, 201));
  }

  /**
   * Авторизация
   * @param {object} data - данные (email, password)
   * @returns {Promise} - Промис объект с сообщением об успешной авторизации
   */
  login({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headerWithContentType,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Выход из системы
   * @returns {Promise} - Промис объект с сообщением об успешном выходе из
   * системы
   */
  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Возвращает данные пользователя
   * Нужна авторизация
   * @returns {Promise} - Промис объект с данными пользователя
   */
  userMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Сохраняет данные пользователя
   * Нужна авторизация
   * @param {object} data - данные (name, about)
   * @returns {Promise} - Промис объект с обновленными данными пользователя
   */
  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headerWithContentType,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Сохраняет аватар пользователя
   * Нужна авторизация
   * @param {object} data - данные (avatar - ссылка на картинку)
   * @returns {Promise} - Промис объект с обновленными данными пользователя
   */
  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headerWithContentType,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Добавляет карточку
   * Нужна авторизация
   * @param {object} data - данные карточки (name, link)
   * @returns {Promise} - Промис объект с данными добавленной карточки
   */
  addItem(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headerWithContentType,
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 201));
  }

  /**
   * Удаляет карточку
   * Нужна авторизация
   * @param {string} cardId - Id
   * @returns {Promise} - Промис объект с данными удаленной карточки
   */
  deleteItem(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Получение списка карточек
   * Нужна авторизация
   * @returns {Promise} - Промис объект с массивом карточек
   */
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Добавляет лайк карточке
   * Нужна авторизация
   * @param {string} cardId - Id
   * @returns {Promise} - Промис объект с обновленными данными карточки
   */
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * Удаляет лайк у карточки
   * Нужна авторизация
   * @param {string} cardId - Id
   * @returns {Promise} - Промис объект с обновленными данными карточки
   */
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then((res) => api.checkStatus(res, 200));
  }

  /**
   * В зависимости есть-ли лайк у карточки, отправляет запрос на добавление или
   * удаление лайка
   * @param {string} cardId - Id
   * @param {boolean} isLiked - Есть-ли лайк
   * @returns {Promise} - Промис объект с обновленными данными карточки
   */
  changeLikeStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }

  /**
   * Функция сравнивания статуса ответа
   * @param res - необработанные данные с сервера
   * @param status - статус который ожидается
   * @returns {Promise} - данные json формате или сообщение об ошибке
   */
  static checkStatus(res, status) {
    if (res.status === status) {
      return res.json();
    }

    throw new Error(badStatus(res.status, status));
  }
}

// eslint-disable-next-line new-cap
export default new api({
  baseUrl: apiBaseUrl,
  headers: {
    Accept: 'application/json',
    Cache: 'no-cache',
  },
});
