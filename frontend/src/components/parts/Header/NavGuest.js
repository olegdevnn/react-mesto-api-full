import React from 'react';

import { NavLink } from 'react-router-dom';

import { SING_IN_LINK, SING_UP_LINK } from '../../../utils/utils';

const NavGuest = () => (
  <nav>
    <ul className="header__nav-links">
      <li key="header-singin-link">
        <NavLink
          to={SING_IN_LINK}
          className="header__nav-item"
          activeClassName="header__nav-link_active"
        >
          Войти
        </NavLink>
      </li>
      <li key="header-singup-link">
        <NavLink
          to={SING_UP_LINK}
          className="header__nav-item"
          activeClassName="header__nav-link_active"
        >
          Регистрация
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavGuest;
