import React, { memo } from 'react';

import PropTypes from 'prop-types';

import errorIcon from '../../images/error.svg';
import okIcon from '../../images/ok.svg';
import EventClosePopup from './EventClosePopup';
import PopupButtonClose from './PopupButtonClose';

const InfoTooltip = ({ isOpen, onClose, data }) => {
  const { isOk, message } = data;

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-message">
        <EventClosePopup isOpen={isOpen} onClose={onClose}>
          <div className="popup__message-box">
            {isOk
              ? <img src={okIcon} alt="" className="popup__icon" />
              : <img src={errorIcon} alt="" className="popup__icon" />}
            <p className="popup__message">{message}</p>
            <PopupButtonClose onClick={onClose} />
          </div>
        </EventClosePopup>
      </div>
    </div>
  );
};

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired,
  ])).isRequired,
};

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isOpen === prevProps.isOpen
  );
}

export default memo(InfoTooltip, areEqual);
