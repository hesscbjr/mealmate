import TypewriterText from "@/components/atoms/TypewriterText";
import React from "react";
import { TextStyle } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

// Pass constants from PreviewScreen or define locally if preferred
const TYPEWRITER_SPEED_MS = 30;
const TYPEWRITER_PAUSE_MS = 1500;

interface LoadingOverlayProps {
  messages: string[];
  progress: SharedValue<number>;
  loadingTextInitialY: number;
  // Pass the specific style object for the TypewriterText
  loadingIngredientHeaderStyle: TextStyle;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  messages,
  progress,
  loadingTextInitialY,
  loadingIngredientHeaderStyle,
}) => {
  const animatedLoadingTextStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: loadingTextInitialY,
      left: 0,
      right: 0,
      alignItems: "center",
      opacity: interpolate(
        progress.value,
        [0, 0.5], // Fade out relatively quickly
        [1, 0],
        Extrapolation.CLAMP
      ),
      // Ensure the view is removed from layout when invisible to prevent interactions
      display: progress.value >= 0.5 ? "none" : "flex",
    };
  });

  return (
    <Animated.View style={animatedLoadingTextStyle}>
      {messages.length > 0 && (
        <TypewriterText
          messages={messages}
          style={loadingIngredientHeaderStyle} // Apply the passed style
          typingSpeed={TYPEWRITER_SPEED_MS}
          pauseDuration={TYPEWRITER_PAUSE_MS}
        />
      )}
    </Animated.View>
  );
};

export default LoadingOverlay;
