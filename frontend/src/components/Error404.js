import React, { memo } from 'react';

import { Link } from 'react-router-dom';

import { HOME_LINK } from '../utils/utils';

const Error404 = () => (
  <main className="content">
    <section className="error">
      <p className="error__title">404 Not Found</p>
      <Link to={HOME_LINK} className="error__link">Перейти на главную</Link>
    </section>
  </main>
);

export default memo(Error404);
