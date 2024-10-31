import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat', () => {
  render(<App />);
  const headerElement = screen.getByText(/Chat Room/i);
  expect(headerElement).toBeInTheDocument();
});
