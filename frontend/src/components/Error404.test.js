import React from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Error404 from './Error404';

describe('Error404 component', () => {
  test('good error404', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>,
    );

    getByText(/404 Not Found/);
  });
});
