import { ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { ColorValue, StyleSheet, ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

type Props = AnimatedProps<ViewProps> & {
  color?: ColorValue;
  foregroundColor?: ColorValue;
  size: number;
  children: ReactNode;
  factor?: number;
};

export default function Box({
  children,
  color,
  foregroundColor,
  size,
  factor = 0.5,
  style: overrideStyle,
  ...props
}: Props) {
  return (
    <Animated.View
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: size,
        },
        overrideStyle,
      ]}>
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            color: foregroundColor,
            size: Math.round(size * factor),
          })
        : children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
});
