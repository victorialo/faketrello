import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders T R E L L N O', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/T R E L L N O/i);
  expect(linkElement).toBeInTheDocument();
});
