import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders correctly', async() => {
  render(<App />);
  const linkElement = screen.getByText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});
