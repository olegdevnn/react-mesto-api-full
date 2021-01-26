import React, { memo, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({
  onUpdateAvatar, isOpen, onClose, isLoading,
}) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!avatar) {
      return;
    }

    onUpdateAvatar({
      avatar,
    });
  }

  const handleSetAvatar = (e) => setAvatar(e.target.value);

  return (
    <PopupWithForm
      title="Редактировать аватар"
      name="popup_edit-profile-avatar"
      buttonName={isLoading ? 'Сохраняется...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__inner">
        <label htmlFor="profile-link-input">
          <input
            id="profile-link-input"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_link"
            required
            value={avatar}
            onChange={handleSetAvatar}
          />
          <span id="profile-link-input-error" className="popup__input-error" />
        </label>
      </div>
    </PopupWithForm>
  );
};

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isOpen === prevProps.isOpen
    && nextProps.isLoading === prevProps.isLoading
  );
}

export default memo(EditAvatarPopup, areEqual);
