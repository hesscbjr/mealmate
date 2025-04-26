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

interface TouchableOpacityHapticProps extends PressableProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  // activeOpacity is simulated via style prop in Pressable
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
}

const TouchableOpacityHaptic = forwardRef<
  React.ElementRef<typeof Pressable>,
  TouchableOpacityHapticProps
>(
  (
    {
      children,
      onPress: onPressProp, // Rename to avoid conflict
      hitSlop = { top: 8, bottom: 8, left: 8, right: 8 },
      activeOpacity = 0.7,
      style,
      disabled,
      accessibilityRole = "button", // Default accessibility role
      ...rest // Spread other props like testID, accessibilityLabel
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
            // Log haptic errors
            console.warn("Haptic feedback failed:", error);
          });
        });

        if (onPressProp) {
          onPressProp(event);
        }
      },
      [onPressProp, disabled]
    ); // Memoize the handler

    const computeStyle = useCallback(
      ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
        style,
        pressed && { opacity: activeOpacity },
        disabled && { opacity: 0.5 }, // Standard disabled opacity
      ],
      [style, activeOpacity, disabled]
    ); // Memoize the style computation

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        hitSlop={hitSlop}
        style={computeStyle}
        disabled={disabled}
        accessibilityRole={accessibilityRole}
        {...rest} // Spread remaining props first
      >
        {children}
      </Pressable>
    );
  }
);

TouchableOpacityHaptic.displayName = "TouchableOpacityHaptic";

export default TouchableOpacityHaptic;
