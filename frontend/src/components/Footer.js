import React, { memo } from 'react';

const Footer = () => (
  <footer className="footer">
    <p className="footer__author">
      &copy;
      {' '}
      {new Date().getFullYear()}
      {' '}
      Mesto Russia
    </p>
  </footer>
);

export default memo(Footer);
