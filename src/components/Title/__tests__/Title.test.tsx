import { render, screen } from '@testing-library/react-native';
import React from 'react';

import Title from '../Title';

describe('Title component', () => {
  it('renders the title text correctly', () => {
    render(<Title>Hello World</Title>);
    const titleText = screen.getByText('Hello World');
    expect(titleText).toBeOnTheScreen();
  });

  it('applies the correct styles to the title', () => {
    render(<Title>Hello World</Title>);
    const title = screen.getByTestId('Title');
    expect(title).toHaveStyle({
      fontSize: 24,
      fontWeight: 'bold',
    });
  });
});
