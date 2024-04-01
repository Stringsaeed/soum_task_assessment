import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';

import TreeViewItem from './TreeViewItem';
import { TreeViewProps } from './types';

export default function TreeView({ data }: TreeViewProps) {
  return (
    <Animated.View layout={LinearTransition} testID="TreeView" style={{ gap: 8 }}>
      {data.map((item) => (
        <TreeViewItem item={item} key={item.id}>
          <TreeView data={item.data} />
        </TreeViewItem>
      ))}
    </Animated.View>
  );
}
