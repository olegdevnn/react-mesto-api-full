import React from 'react';

import PropTypes from 'prop-types';

const NavProfile = ({ email, onSignOut }) => (
  <nav>
    <ul className="header__auth-links">
      <li
        className="header__auth-link header__auth-email"
        key="header-profile-email"
      >
        {email}
      </li>
      <li
        className="header__auth-link"
        key="header-profile-logout"
      >
        <button
          type="button"
          className="header__button"
          onClick={onSignOut}
          aria-label="Выйти"
        >
          Выйти
        </button>
      </li>
    </ul>
  </nav>
);

NavProfile.propTypes = {
  email: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default NavProfile;
