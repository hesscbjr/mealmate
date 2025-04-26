import TypewriterText from "@/components/molecules/TypewriterText";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const TYPEWRITER_SPEED_MS = 30;
const TYPEWRITER_PAUSE_MS = 1500;

type LoadingOverlayProps = {
  messages: string[];
  progress: SharedValue<number>;
  loadingTextInitialY: number;
  loadingIngredientHeaderStyle: TextStyle;
};

const LoadingOverlay = ({
  messages,
  progress,
  loadingTextInitialY,
  loadingIngredientHeaderStyle,
}: LoadingOverlayProps) => {
  const animatedLoadingTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );
    const display = progress.value >= 0.5 ? "none" : "flex";

    return {
      opacity,
      display,
      top: loadingTextInitialY,
    };
  });

  const finalContainerStyle = [styles.container, animatedLoadingTextStyle];

  return (
    <Animated.View style={finalContainerStyle}>
      {messages.length > 0 && (
        <TypewriterText
          messages={messages}
          style={loadingIngredientHeaderStyle}
          typingSpeed={TYPEWRITER_SPEED_MS}
          pauseDuration={TYPEWRITER_PAUSE_MS}
        />
      )}
    </Animated.View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
