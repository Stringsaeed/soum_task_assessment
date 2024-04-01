import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ISelectionContext = {
  handleSelect: (id: string) => void;
  selectedValue: string[];
};

const SelectionContext = createContext<ISelectionContext | null>(null);

type SelectionProviderProps = PropsWithChildren<{
  selectedValue: string[];
  onSelectedValueChange: (selectedValue: string[]) => void;
}>;

export function SelectionProvider({
  onSelectedValueChange,
  selectedValue,
  children,
}: SelectionProviderProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(selectedValue);

  const handleSelect = useCallback(
    (id: string) => {
      const newSet = new Set(selectedValues);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      const newSelectedValue = Array.from(newSet);
      setSelectedValues(newSelectedValue);
      onSelectedValueChange(newSelectedValue);
    },
    [onSelectedValueChange, selectedValues],
  );

  const contextValue = useMemo(
    () => ({ handleSelect, selectedValue }),
    [handleSelect, selectedValue],
  );

  return <SelectionContext.Provider value={contextValue}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
