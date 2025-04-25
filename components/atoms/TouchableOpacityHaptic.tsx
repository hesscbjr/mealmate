import * as Haptics from "expo-haptics";
import React, { ReactNode, forwardRef } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface TouchableOpacityHapticProps extends TouchableOpacityProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const TouchableOpacityHaptic = forwardRef<View, TouchableOpacityHapticProps>(
  ({ children, onPress, ...rest }, ref) => {
    const handlePress = (event: GestureResponderEvent) => {
      Haptics.selectionAsync();
      if (onPress) {
        onPress(event);
      }
    };

    return (
      <TouchableOpacity ref={ref} onPress={handlePress} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
);

TouchableOpacityHaptic.displayName = "TouchableOpacityHaptic";

export default TouchableOpacityHaptic;
