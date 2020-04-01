import React from 'react';
import { render } from '@testing-library/react';
import MenuBar from './components/MenuBar/MenuBar';

test('renders learn react link', () => {
  const { getByText } = render(<MenuBar />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
