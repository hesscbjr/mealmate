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

const CAPTURE_BUTTON_SIZE = 70;
const CAPTURE_BUTTON_BORDER_WIDTH = 4;

type CaptureButtonProps = PressableProps & {
  style?: StyleProp<ViewStyle>;
};

const CaptureButton = forwardRef<
  React.ElementRef<typeof Pressable>,
  CaptureButtonProps
>(({ style, onPress, accessibilityLabel, disabled, ...rest }, ref) => {
  const handlePress = onPress
    ? (event: GestureResponderEvent) => onPress(event)
    : undefined;

  const { captureButtonBackground, captureButtonBorder } = useThemeColor({}, [
    "captureButtonBackground",
    "captureButtonBorder",
  ]);

  const finalStyle = [
    styles.captureButton,
    {
      backgroundColor: captureButtonBackground,
      borderColor: captureButtonBorder,
    },
    style,
  ];

  return (
    <TouchableOpacityHaptic
      {...rest}
      ref={ref}
      style={finalStyle}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? "Capture Photo"}
    >
      <></>
    </TouchableOpacityHaptic>
  );
});

const styles = StyleSheet.create({
  captureButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: CAPTURE_BUTTON_BORDER_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
});

CaptureButton.displayName = "CaptureButton";

export default CaptureButton;
