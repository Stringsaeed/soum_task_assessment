import { render, screen } from '@testing-library/react-native';
import { Check } from 'lucide-react-native';

import Box from '../Box';

describe('Box', () => {
  it('should render with default styles', () => {
    render(
      <Box testID="box" size={24}>
        <Check />
      </Box>,
    );

    const boxElement = screen.getByTestId('box');
    expect(boxElement).toBeDefined();
    expect(boxElement).toHaveStyle({ width: 24 });
  });

  it('should render with custom props', () => {
    render(
      <Box testID="box" color="blue" factor={0.8} size={24} foregroundColor="white">
        <Check testID="check-icon" />
      </Box>,
    );

    const boxElement = screen.getByTestId('box');
    expect(boxElement).toBeDefined();
    expect(boxElement).toHaveStyle({ backgroundColor: 'blue', width: 24 });

    const checkElement = screen.getAllByTestId('check-icon')[0];
    expect(screen.toJSON()).toMatchSnapshot();
    expect(checkElement).toBeDefined();
    expect(checkElement).toHaveProp('stroke', 'white');
    const iconSize = Math.round(24 * 0.8);
    expect(checkElement).toHaveStyle({ height: iconSize, width: iconSize });
  });
});
