import React from 'react';

import PropTypes from 'prop-types';

import EventClosePopup from './EventClosePopup';
import PopupButtonClose from './PopupButtonClose';

export default function PopupWithForm({
  onSubmit,
  onClose,
  name,
  title,
  buttonName,
  isOpen,
  children,
}) {
  return (
    <div className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <EventClosePopup isOpen={isOpen} onClose={onClose}>
          <form
            action="#"
            name={name}
            className="popup__form"
            onSubmit={onSubmit}
          >
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__save-button" type="submit" aria-label={buttonName}>
              {buttonName}
            </button>
          </form>
          <PopupButtonClose onClick={onClose} />
        </EventClosePopup>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
