import React, { memo } from 'react';

import PropTypes from 'prop-types';

import EventClosePopup from '../popup/EventClosePopup';
import PopupButtonClose from '../popup/PopupButtonClose';

const ImagePopup = ({ card, isOpen, onClose }) => (
  <div className={`popup popup_view-photo ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container-photo">
      <EventClosePopup isOpen={isOpen} onClose={onClose}>
        <figure className="popup__photo-box">
          <img src={card.link} alt={card.name} className="popup__photo" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <PopupButtonClose onClick={onClose} />
      </EventClosePopup>
    </div>
  </div>
);

ImagePopup.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.shape({
    })),
    owner: PropTypes.shape({
      _id: PropTypes.string,
    }),
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ImagePopup.defaultProps = {
  card: {
    _id: '',
    name: '',
    like: '',
    likes: [],
    owner: [],
  },
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.card === prevProps.card && nextProps.isOpen === prevProps.isOpen
  );
}

export default memo(ImagePopup, areEqual);
