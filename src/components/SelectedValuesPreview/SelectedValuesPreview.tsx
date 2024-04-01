import { XCircle } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Chip from '@/components/Chip';
import Title from '@/components/Title';
import { TreeViewItem } from '@/components/TreeView/types';
import { useSelection } from '@/contexts';

function findInData(data: TreeViewItem[], value: string): TreeViewItem | undefined {
  if (!data) {
    return;
  }
  for (const item of data) {
    if (item.id === value) {
      return item;
    }
    if (item.data.length) {
      const found = findInData(item.data, value);
      if (found) {
        return found;
      }
    }
  }
}

export default function SelectedValuesPreview({ data }: { data: TreeViewItem[] }) {
  const { selectedValue, handleSelect } = useSelection();
  const selectedData = useMemo(() => {
    return selectedValue
      .map((value) => {
        return findInData(data, value);
      })
      .filter(Boolean) as TreeViewItem[];
  }, [selectedValue, data]);

  return (
    <View style={styles.selectedValuesContainer}>
      <Title>Select Value: {selectedValue.length && selectedValue.length}</Title>
      <View style={styles.selectValuesWrapper}>
        {selectedData.map((item) => (
          <Chip
            onPress={() => {
              handleSelect(item.id);
            }}
            key={item.id}
            label={`${item.data.length ? 'All ' : ''}${item.name}`}
            icon={XCircle}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectValuesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  selectedValuesContainer: { gap: 8 },
});
