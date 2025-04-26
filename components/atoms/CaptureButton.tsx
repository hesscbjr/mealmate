import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import TouchableOpacityHaptic from "./TouchableOpacityHaptic";

// Reuse constants or define specific ones if needed
const CAPTURE_BUTTON_SIZE = 70;
const CAPTURE_BUTTON_BORDER_WIDTH = 4;

// Base the props on PressableProps
interface CaptureButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

const CaptureButton = forwardRef<
  React.ElementRef<typeof Pressable>,
  CaptureButtonProps
>(({ style, onPress, accessibilityLabel, disabled, ...rest }, ref) => {
  // Ensure onPress passed to TouchableOpacityHaptic is either the function or undefined
  const handlePress = onPress
    ? (event: GestureResponderEvent) => onPress(event)
    : undefined;

  // Get theme colors
  const { captureButtonBackground, captureButtonBorder } = useThemeColor({}, [
    "captureButtonBackground",
    "captureButtonBorder",
  ]);

  // Generate dynamic styles
  const dynamicStyles = getDynamicStyles(
    captureButtonBackground,
    captureButtonBorder
  );

  return (
    <TouchableOpacityHaptic
      {...rest}
      ref={ref}
      style={[dynamicStyles.captureButton, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? "Capture Photo"}
    >
      <>
        {/* Empty fragment satisfies children prop for TouchableOpacityHaptic */}
      </>
    </TouchableOpacityHaptic>
  );
});

// Moved styles into a function
const getDynamicStyles = (backgroundColor: string, borderColor: string) =>
  StyleSheet.create({
    captureButton: {
      width: CAPTURE_BUTTON_SIZE,
      height: CAPTURE_BUTTON_SIZE,
      borderRadius: CAPTURE_BUTTON_SIZE / 2,
      backgroundColor: backgroundColor,
      borderWidth: CAPTURE_BUTTON_BORDER_WIDTH,
      borderColor: borderColor,
      justifyContent: "center",
      alignItems: "center",
    },
  });

CaptureButton.displayName = "CaptureButton";

export default CaptureButton;
