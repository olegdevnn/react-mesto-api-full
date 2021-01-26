import React, { memo, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({
  onAddPlace,
  isOpen,
  onClose,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  const handleSetName = (e) => setName(e.target.value);

  const handleSetLink = (e) => setLink(e.target.value);

  return (
    <PopupWithForm
      title="Добавить место"
      name="popup_add-photo"
      buttonName={isLoading ? 'Добавляется...' : 'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <div className="popup__inner">
          <label htmlFor="photo-name-input">
            <input
              id="photo-name-input"
              type="text"
              name="name"
              value={name}
              placeholder="Название"
              className="popup__input popup__input_name"
              required
              minLength="2"
              maxLength="30"
              onChange={handleSetName}
            />
            <span id="photo-name-input-error" className="popup__input-error" />
          </label>
        </div>
        <div className="popup__inner">
          <label htmlFor="photo-link-input">
            <input
              id="photo-link-input"
              type="url"
              name="link"
              value={link}
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_link"
              required
              onChange={handleSetLink}
            />
            <span id="photo-link-input-error" className="popup__input-error" />
          </label>
        </div>
      </>
    </PopupWithForm>
  );
};

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isOpen === prevProps.isOpen
    && nextProps.isLoading === prevProps.isLoading
  );
}

export default memo(AddPlacePopup, areEqual);
