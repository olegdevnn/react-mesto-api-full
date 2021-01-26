import React, { memo, useState } from 'react';

import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { HOME_LINK } from '../../utils/utils';
import ButtonProfile from './ButtonProfile';
import NavGuest from './NavGuest';
import NavProfile from './NavProfile';
import NavProfileMobile from './NavProfileMobile';

const Header = ({ onSignOut, email, loggedIn }) => {
  const { pathname } = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  const handleViewProfile = () => setIsProfile(!isProfile);

  let logo;
  if (pathname === '/') {
    logo = <div className="logo header__logo" />;
  } else {
    logo = <Link to={HOME_LINK} className="logo header__logo" />;
  }

  return (
    <header className="header">
      {loggedIn && isProfile && (
      <NavProfileMobile
        email={email}
        onSignOut={onSignOut}
      />
      )}
      <div className="header__main">
        {logo}
        {loggedIn ? (
          <>
            <NavProfile
              email={email}
              onSignOut={onSignOut}
            />
            <ButtonProfile
              isProfile={isProfile}
              onViewProfile={handleViewProfile}
            />
          </>
        )
          : loggedIn !== null && <NavGuest />}
      </div>
    </header>
  );
};

Header.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: null,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(nextProps) === JSON.stringify(prevProps);
}

export default memo(Header, areEqual);
