import { Check, Minus } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';

import Box from '@/components/Box';

type Props = {
  status: 'checked' | 'unchecked' | 'indeterminate';
};

export default function CheckBox({ status }: Props) {
  return (
    <Box
      testID={`CheckBox-${status}`}
      layout={LinearTransition}
      style={styles.container}
      color={status !== 'unchecked' ? 'black' : 'white'}
      size={20}>
      {status === 'indeterminate' && (
        <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
          <Minus color="white" size={16} />
        </Animated.View>
      )}
      {status === 'checked' && (
        <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
          <Check color="white" size={16} />
        </Animated.View>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 2,
  },
});
