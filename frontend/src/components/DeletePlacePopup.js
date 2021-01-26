import React, { memo } from 'react';

import PropTypes from 'prop-types';

import EventClosePopup from './EventClosePopup';
import PopupButtonClose from './PopupButtonClose';

const DeletePlacePopup = ({
  onDeletePlace,
  card,
  isOpen,
  onClose,
  isLoading,
}) => {
  function handleSubmit(e) {
    e.preventDefault();

    onDeletePlace(card);
  }

  return (
    <div
      className={`popup popup_delete-photo" ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container">
        <EventClosePopup isOpen={isOpen} onClose={onClose}>
          <form
            action="#"
            name="deletePhotoForm"
            className="popup__form"
            onSubmit={handleSubmit}
          >
            <h2 className="popup__title-delete">Вы уверены?</h2>
            <button className="popup__save-button" type="submit" aria-label="Удалить">
              {isLoading ? 'Удаляется...' : 'Да'}
            </button>

          </form>
          <PopupButtonClose onClick={onClose} />
        </EventClosePopup>
      </div>
    </div>
  );
};

DeletePlacePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeletePlace: PropTypes.func.isRequired,
  card: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })),
    owner: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }),
};

DeletePlacePopup.defaultProps = {
  card: {
    _id: '',
    name: '',
    link: '',
    likes: [],
    owner: [],
  },
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isOpen === prevProps.isOpen
    && nextProps.isLoading === prevProps.isLoading
  );
}

export default memo(DeletePlacePopup, areEqual);
