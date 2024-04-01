export interface TreeViewItem {
  id: string;
  name: string;
  data: TreeViewItem[];
}

export interface TreeViewProps {
  data: TreeViewItem[];
  selectedValue?: string[];
}
