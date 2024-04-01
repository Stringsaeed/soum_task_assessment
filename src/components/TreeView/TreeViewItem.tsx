import { Minus, Plus } from 'lucide-react-native';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { LinearTransition, FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { TreeViewItem as ITreeViewItem } from './types';

import Box from '@/components/Box';
import CheckBox from '@/components/CheckBox';
import { useSelection } from '@/contexts';

type Props = PropsWithChildren<{ item: ITreeViewItem }>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TreeViewItem({ item, children }: Props) {
  const isExpanderItem = item.data.length;
  const { handleSelect, selectedValue } = useSelection();
  const isSelected = selectedValue.includes(item.id);
  const [isExpanded, setIsExpanded] = useState(isSelected);

  const onPress = () => {
    if (isExpanderItem) {
      setIsExpanded(!isExpanded);
    } else {
      handleSelect(item.id);
    }
  };

  return (
    <AnimatedPressable
      testID="TreeViewItem"
      layout={LinearTransition}
      onPress={onPress}
      style={styles.container}>
      {!isExpanderItem && <CheckBox status={isSelected ? 'checked' : 'unchecked'} />}
      {!!isExpanderItem && (
        <Box size={20} factor={0.8} color="beige" foregroundColor="black">
          {isExpanded ? <Minus size={16} color="black" /> : <Plus size={16} color="black" />}
        </Box>
      )}
      <Animated.View
        testID="TreeViewDataRoot"
        layout={LinearTransition}
        style={styles.nameDataContainer}>
        <Text style={[styles.name, isSelected && styles.nameSelected]}>{item.name}</Text>
        {isExpanded && (
          <Animated.View
            testID="TreeViewItemExpanded"
            entering={FadeInDown}
            exiting={FadeOutUp}
            layout={LinearTransition}
            style={styles.expanded}>
            {!!isExpanderItem && (
              <TreeViewItem item={{ ...item, name: `All in ${item.name}`, data: [] }} />
            )}
            {children}
          </Animated.View>
        )}
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 4 },
  name: { fontSize: 16, lineHeight: 20 },
  nameSelected: { fontWeight: '600' },
  nameDataContainer: {
    overflow: 'hidden',
    flex: 1,
    gap: 8,
  },
  expanded: { gap: 8, overflow: 'hidden' },
});
