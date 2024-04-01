import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectedValuesPreview, Title, TreeView } from './components';
import { SelectionProvider } from './contexts';

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
        id: 'samsung',
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

export default function App() {
  const { top, bottom } = useSafeAreaInsets();
  const [selectedValue, setSelectedValue] = useState<string[]>([
    'phone_category',
    'apple',
    'iphone',
    'iphone_12',
  ]);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
      ]}>
      <SelectionProvider selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}>
        <View style={styles.treeViewContainer}>
          <Title>Products:</Title>
          <TreeView data={data} />
        </View>
        <SelectedValuesPreview data={data} />
      </SelectionProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 24,
  },
  content: { paddingHorizontal: 16, flexGrow: 1, gap: 24 },
  treeViewContainer: { gap: 8 },
});
