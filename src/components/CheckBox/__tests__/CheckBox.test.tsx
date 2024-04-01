import { render, screen } from '@testing-library/react-native';

import CheckBox from '../CheckBox';

describe('CheckBox', () => {
  it('should render', () => {
    render(<CheckBox status="unchecked" />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should handle indeterminate status', () => {
    render(<CheckBox status="indeterminate" />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should handle checked status', () => {
    render(<CheckBox status="checked" />);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
