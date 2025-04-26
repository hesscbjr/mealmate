import * as Haptics from "expo-haptics";
import React, { ReactNode, forwardRef, useCallback } from "react";
import {
  GestureResponderEvent,
  InteractionManager,
  Pressable,
  type PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

type TouchableOpacityHapticProps = PressableProps & {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const TouchableOpacityHaptic = forwardRef<
  React.ElementRef<typeof Pressable>,
  TouchableOpacityHapticProps
>(
  (
    {
      children,
      onPress: onPressProp,
      hitSlop = { top: 8, bottom: 8, left: 8, right: 8 },
      style,
      disabled,
      accessibilityRole = "button",
      ...rest
    },
    ref
  ) => {
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (disabled) {
          return;
        }

        InteractionManager.runAfterInteractions(() => {
          Haptics.selectionAsync().catch((error) => {
            console.warn("Haptic feedback failed:", error);
          });
        });

        if (onPressProp) {
          onPressProp(event);
        }
      },
      [onPressProp, disabled]
    );

    const computeStyle = useCallback(
      ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
        style,
        pressed && { opacity: 0.7 },
        disabled && { opacity: 0.5 },
      ],
      [style, disabled]
    );

    return (
      <Pressable
        {...rest}
        ref={ref}
        onPress={handlePress}
        hitSlop={hitSlop}
        style={computeStyle}
        disabled={disabled}
        accessibilityRole={accessibilityRole}
      >
        {children}
      </Pressable>
    );
  }
);

TouchableOpacityHaptic.displayName = "TouchableOpacityHaptic";

export default TouchableOpacityHaptic;
