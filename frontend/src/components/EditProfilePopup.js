import React, {
  memo, useContext, useEffect, useState,
} from 'react';

import PropTypes from 'prop-types';

import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({
  onUpdateUser, isOpen, onClose, isLoading,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  const handleSetName = (e) => setName(e.target.value);

  const handleSetDescription = (e) => setDescription(e.target.value);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popup_edit-profile"
      buttonName={isLoading ? 'Сохраняется...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__inner">
          <label htmlFor="profile-name-input">
            <input
              id="profile-name-input"
              type="text"
              name="name"
              value={name}
              placeholder="Имя"
              className="popup__input popup__input_name"
              required
              minLength="2"
              maxLength="40"
              onChange={handleSetName}
            />
            <span
              id="profile-name-input-error"
              className="popup__input-error"
            />
          </label>
        </div>
        <div className="popup__inner">
          <label htmlFor="profile-job-input">
            <input
              id="profile-job-input"
              type="text"
              name="description"
              value={description}
              placeholder="Профессия"
              className="popup__input popup__input_job"
              required
              minLength="2"
              maxLength="200"
              onChange={handleSetDescription}
            />
            <span
              id="profile-job-input-error"
              className="popup__input-error"
            />
          </label>
        </div>
      </>
    </PopupWithForm>
  );
};

/**
 * @param {boolean} isOpen - статус состояния окна
 * @param {boolean} isLoading - статус загружаемых данных из api
 * @param {function} onClose - функция закрытия окна
 * @param {function} onUpdateUser - функция сохранения данных пользователя по api
 */
EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isOpen === prevProps.isOpen
    && nextProps.isLoading === prevProps.isLoading
  );
}

export default memo(EditProfilePopup, areEqual);
