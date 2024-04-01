import { render, fireEvent, screen } from '@testing-library/react-native';
import { X } from 'lucide-react-native';
import React from 'react';

import Chip from '../Chip';

describe('Chip', () => {
  const mockOnPress = jest.fn();

  it('renders the chip label and icon', () => {
    render(<Chip label="Example Chip" onPress={mockOnPress} icon={X} />);

    const chipLabel = screen.getByText('Example Chip');
    const chipIcon = screen.getAllByTestId('ChipIcon')[0];

    expect(chipLabel).toBeOnTheScreen();
    expect(chipIcon).toBeOnTheScreen();
  });

  it('calls the onPress function when the chip is pressed', () => {
    render(<Chip label="Example Chip" onPress={mockOnPress} icon={X} />);

    const chip = screen.getByTestId('Chip');

    fireEvent.press(chip);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
