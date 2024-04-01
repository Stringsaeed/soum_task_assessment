import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Title({ children }: PropsWithChildren) {
  return (
    <Text testID="Title" style={styles.title}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
