import { render, fireEvent, screen, renderHook } from '@testing-library/react-native';
import React from 'react';
import { Button, Text } from 'react-native';

import { SelectionProvider, useSelection } from '../SelectionContext';

describe('SelectionContext', () => {
  test('should update selectedValue when handleSelect is called', () => {
    const onSelectedValueChange = jest.fn();
    const TestComponent = () => {
      const { handleSelect, selectedValue } = useSelection();

      const handleClick = () => {
        handleSelect('1');
      };

      return (
        <>
          <Button title="Select" onPress={handleClick} />
          <Text>{JSON.stringify(selectedValue)}</Text>
        </>
      );
    };

    render(
      <SelectionProvider selectedValue={[]} onSelectedValueChange={onSelectedValueChange}>
        <TestComponent />
      </SelectionProvider>,
    );

    const selectButton = screen.getByText('Select');
    fireEvent.press(selectButton);
    expect(onSelectedValueChange).toHaveBeenCalledWith(['1']);

    fireEvent.press(selectButton);
    expect(onSelectedValueChange).toHaveBeenCalledWith([]);
  });

  test('should throw if the useSelection hook is used outside of a SelectionProvider', () => {
    expect(() => {
      renderHook(() => useSelection());
    }).toThrow(Error('useSelection must be used within a SelectionProvider'));
  });
});
