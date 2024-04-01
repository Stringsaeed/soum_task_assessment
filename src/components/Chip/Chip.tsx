import { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

type ChipProps = {
  label: string;
  onPress: () => void;
  icon: LucideIcon;
};

export default function Chip({ label, onPress, icon: Icon }: ChipProps) {
  return (
    <Pressable testID="Chip" onPress={onPress} style={styles.chip}>
      <Icon testID="ChipIcon" color="white" size={16} />
      <Text style={styles.chipText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chipText: { color: 'white' },
});
