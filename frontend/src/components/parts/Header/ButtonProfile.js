import React from 'react';

import PropTypes from 'prop-types';

const ButtonProfile = ({ isProfile, onViewProfile }) => {
  if (!isProfile) {
    return (
      <button
        key="header-open-profile-button"
        type="button"
        onClick={onViewProfile}
        className="header__open-profile-button"
      >
        <div className="header__open-profile-link" />
        <div className="header__open-profile-link" />
        <div className="header__open-profile-link" />
      </button>
    );
  }

  return (
    <button
      className="header__close-profile-button"
      type="button"
      aria-label="Закрыть профиль"
      onClick={onViewProfile}
    />
  );
};

ButtonProfile.propTypes = {
  isProfile: PropTypes.bool.isRequired,
  onViewProfile: PropTypes.func.isRequired,
};

export default ButtonProfile;
