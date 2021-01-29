import React, { memo } from 'react';

import PropTypes from 'prop-types';

const PopupButtonClose = ({ onClick }) => (
  <button
    type="button"
    aria-label="Закрыть"
    className="popup__close-icon"
    onClick={onClick}
  />
);

function areEqual(prevProps, nextProps) {
  return nextProps.cards === prevProps.cards;
}

PopupButtonClose.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(PopupButtonClose, areEqual);
