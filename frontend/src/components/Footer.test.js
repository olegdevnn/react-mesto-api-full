import React from 'react';

import { render } from '@testing-library/react';

import Footer from './Footer';

describe('Footer component', () => {
  test('good footer', () => {
    const { getByText } = render(<Footer />);

    getByText(/Russia/);
  });
});
