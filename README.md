# TreeView Component

## Overview

https://github.com/Stringsaeed/soum_task_assessment/assets/37156636/e3ec78ad-000a-4e50-8aa0-3ef4f1477a49

This a simple TreeView component that displays a hierarchical tree structure. The component allows users to expand and collapse nodes, view node details, and selects nodes.

## Key Features

1. **Hierarchical Tree Structure**: The component displays a hierarchical tree structure with parent and child nodes.
2. **Expand and Collapse Nodes**: Users can expand and collapse nodes to view or hide child nodes.
3. **Node Details**: Users can view details of each node, such as name, description, and additional information.
4. **Node Selection**: Users can select nodes to perform actions or view more details.

## Implementation

The TreeView component is implemented using React Native and React Native Reanimated. The component consists of the following key elements:

1. **TreeView**: The main component that renders the hierarchical tree structure.
2. **SelectionContext**: A context provider that manages the selected nodes and provides selection-related functions.

## Usage

To use the TreeView component, follow these steps:

```typescript
import { useState } from 'react';

import { TreeView } from '@/components';
import { TreeViewItem } from '@/components/TreeView/types';
import { SelectionProvider } from '@/contexts';

const data: TreeViewItem[] = [
  {
    id: 'root',
    name: 'Root',
    data: [
      {
        id: '2',
        name: 'Child 1',
        data: [
          {
            id: '3',
            name: 'Grandchild 1',
            data: [],
          },
          {
            id: '4',
            name: 'Grandchild 2',
            data: [],
          },
        ],
      },
      {
        id: '5',
        name: 'Child 2',
        data: [],
      },
    ],
  },
];

export default function Example() {
  const [selectedValue, onSelectedValueChange] = useState<string[]>([]);

  return (
    <SelectionProvider selectedValue={selectedValue} onSelectedValueChange={onSelectedValueChange}>
      <TreeView data={data} />
    </SelectionProvider>
  );
}
```

## Benefits

The TreeView component offers the following benefits:

1. **Interactive User Interface**: The component provides an interactive user interface that allows users to explore and navigate the hierarchical tree structure.
2. **Enhanced User Experience**: The component enhances the user experience by providing a visual representation of the data and enabling users to interact with the tree structure.
3. **Improved Data Visualization**: The component helps users visualize the hierarchical relationships between nodes and understand the data structure more effectively.
4. **Customizable Styling**: The component supports customizable styling options to match the app's design and branding.

## Conclusion

The TreeView component is a versatile and user-friendly tool for displaying hierarchical tree structures in React Native applications. By leveraging this component, developers can create interactive and visually appealing interfaces that enhance the user experience and improve data visualization.
