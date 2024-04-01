import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import TreeView from '../TreeView';

import { SelectionProvider } from '@/contexts';

const data = [
  {
    id: 'phone_category',
    name: 'Phone Category',
    data: [
      {
        id: 'apple',
        name: 'Apple',
        data: [
          {
            id: 'iphone',
            name: 'iPhone',
            data: [
              {
                id: 'iphone_12',
                name: 'iPhone 12',
                data: [],
              },
              {
                id: 'iphone_11',
                name: 'iPhone 11',
                data: [],
              },
            ],
          },
        ],
      },
      {
        id: 'samsung',
        name: 'Samsung',
        data: [
          {
            id: 'galaxy',
            name: 'Galaxy',
            data: [
              {
                id: 'galaxy_s21',
                name: 'Galaxy S21',
                data: [],
              },
              {
                id: 'galaxy_s20',
                name: 'Galaxy S20',
                data: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'laptop_category',
    name: 'Laptop Category',
    data: [
      {
        id: 'dell',
        name: 'Dell',
        data: [
          {
            id: 'xps',
            name: 'XPS',
            data: [],
          },
          {
            id: 'inspiron',
            name: 'Inspiron',
            data: [],
          },
        ],
      },
      {
        id: 'macbook',
        name: 'MacBook',
        data: [
          {
            id: 'macbook_air',
            name: 'MacBook Air',
            data: [],
          },
          {
            id: 'macbook_pro',
            name: 'MacBook Pro',
            data: [],
          },
        ],
      },
    ],
  },
  {
    id: 'tablet_category',
    name: 'Tablet Category',
    data: [
      {
        id: 'tablet_samsung',
        name: 'Samsung',
        data: [
          {
            id: 'galaxy_tab',
            name: 'Galaxy Tab',
            data: [],
          },
        ],
      },
    ],
  },
  {
    id: 'watch_category',
    name: 'Watch Category',
    data: [
      {
        id: 'apple_watch',
        name: 'Apple Watch',
        data: [
          {
            id: 'apple_watch_series_7',
            name: 'Apple Watch Series 7',
            data: [],
          },
          {
            id: 'apple_watch_series_6',
            name: 'Apple Watch Series 6',
            data: [],
          },
        ],
      },
    ],
  },
];

jest.retryTimes(3);

describe('TreeView', () => {
  it('should render', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue = ['apple', 'iphone', 'iphone_12'];
    render(<TreeView data={data} />, {
      wrapper: ({ children }) => (
        <SelectionProvider
          selectedValue={mockedSelectedValue}
          onSelectedValueChange={mockedOnSelectedValueChange}>
          {children}
        </SelectionProvider>
      ),
    });

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render all parent data list', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue: string[] = [];
    render(<TreeView data={data} />, {
      wrapper: ({ children }) => (
        <SelectionProvider
          selectedValue={mockedSelectedValue}
          onSelectedValueChange={mockedOnSelectedValueChange}>
          {children}
        </SelectionProvider>
      ),
    });

    expect(screen.queryAllByTestId('TreeViewItem').length).toBe(data.length);
  });

  it('should render data with expended state for selection', async () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue = ['phone_category', 'apple', 'iphone', 'iphone_12'];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    expect(screen.queryAllByTestId('TreeViewItem').length).toBe(12);
    await screen.findAllByTestId('TreeViewItemExpanded');
  });

  it('should render data with selected state', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue = ['phone_category', 'apple', 'iphone', 'iphone_12'];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    expect(screen.queryAllByTestId(`CheckBox-checked`).length).toBe(4);
  });

  it('should make the parent status checked when all children are selected', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue = ['phone_category', 'apple', 'iphone', 'iphone_12', 'iphone_11'];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    expect(screen.queryAllByTestId(`CheckBox-checked`).length).toBe(5);
  });

  it('should handle onPress for expender item', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue: string[] = [];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    const expandedTreeViewItem = screen.queryAllByTestId('TreeViewItemExpanded');
    const phoneCategoryItemView = screen.getAllByTestId('TreeViewItem')[0];
    fireEvent.press(phoneCategoryItemView);
    const expendedTreeViewItemAfterPress = screen.queryAllByTestId('TreeViewItemExpanded');
    expect(expendedTreeViewItemAfterPress.length).toBe(expandedTreeViewItem.length + 1);
  });

  it('should handle onPress for selection item', async () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue: string[] = [];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    const phoneCategoryItemView = screen.getAllByTestId('TreeViewItem')[0];
    fireEvent.press(phoneCategoryItemView);
    await waitFor(() => screen.findByTestId('TreeViewItemExpanded'));
    fireEvent.press(screen.getAllByTestId('TreeViewItem')[1]);
    expect(mockedOnSelectedValueChange).toHaveBeenCalledWith(['phone_category']);
  });

  it('should handle expand if any children is selected', () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue = ['phone_category', 'apple', 'iphone', 'iphone_12'];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    expect(screen.queryAllByTestId('TreeViewItemExpanded').length).toBe(7);
    expect(screen.queryAllByTestId('CheckBox-checked').length).toBe(mockedSelectedValue.length);
  });

  it('should set expand if selected after press', async () => {
    const mockedOnSelectedValueChange = jest.fn();
    const mockedSelectedValue: string[] = [];
    render(
      <SelectionProvider
        selectedValue={mockedSelectedValue}
        onSelectedValueChange={mockedOnSelectedValueChange}>
        <TreeView data={data} />
      </SelectionProvider>,
    );

    expect(screen.queryAllByTestId('TreeViewItemExpanded').length).toBe(0);
    await fireEvent.press(screen.getAllByTestId('TreeViewItem')[0]);
    expect(screen.queryAllByTestId('TreeViewItemExpanded').length).toBe(1);
  });
});
