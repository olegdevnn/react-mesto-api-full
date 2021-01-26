import React from 'react';

import PropTypes from 'prop-types';

const NavProfileMobile = ({ email, onSignOut }) => (
  <div className="header__profile-mobile">
    <nav key="NavProfileMobile">
      <ul className="header__auth-mobile-links">
        <li
          className="header__auth-mobile-link header__auth-email"
          key="header-profile-mobile-email"
        >
          {email}
        </li>
        <li
          className="header__auth-mobile-link"
          key="header-profile-mobile-logout"
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
  </div>
);

NavProfileMobile.propTypes = {
  email: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default NavProfileMobile;
