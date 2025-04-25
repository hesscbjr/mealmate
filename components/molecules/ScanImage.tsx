import React, { useEffect } from "react";
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ScanImageProps extends Omit<ImageProps, "style"> {
  scanColor?: string; // color of the scan bar
  scanHeight?: number; // thickness of the scan bar
  duration?: number; // Time for one pass (down OR up) in ms
  pauseDuration?: number; // Duration of pause between scans (ms)
  loading?: boolean; // Added loading prop
  height: number; // *** Required height prop ***
  style?: StyleProp<ViewStyle>; // Style for the main wrapper View
  imageStyle?: ImageProps["style"]; // Optional separate style for inner Image
}

const ScanImage: React.FC<ScanImageProps> = ({
  scanColor = "rgba(0, 255, 0, 0.5)", // Default to the green used in preview
  scanHeight = 5, // Default to the height used in preview
  duration = 750, // Default duration for one pass (makes total cycle 1.5s + pause)
  pauseDuration = 500, // Default pause duration
  loading = false, // Default loading to false
  height, // Use height prop
  style, // Use style for wrapper
  imageStyle, // Use imageStyle for Image
  ...imageProps
}) => {
  const progress = useSharedValue(loading ? height : 0);
  const scanBarOpacity = useSharedValue(0);

  useEffect(() => {
    if (height > 0 && loading) {
      const targetYTop = -scanHeight;
      const targetYBottom = height;

      progress.value = targetYBottom;
      scanBarOpacity.value = 0;

      progress.value = withRepeat(
        withSequence(
          withTiming(targetYTop, {
            duration,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(targetYBottom, {
            duration,
            easing: Easing.inOut(Easing.quad),
          }),
          withDelay(pauseDuration, withTiming(targetYBottom, { duration: 0 }))
        ),
        -1
      );

      scanBarOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 50 }),
          withDelay(duration * 2 - 50, withTiming(1, { duration: 0 })),
          withTiming(0, { duration: 0 }),
          withDelay(pauseDuration, withTiming(0, { duration: 0 }))
        ),
        -1
      );
    } else {
      progress.value = withTiming(0, { duration: 200 });
      scanBarOpacity.value = withTiming(0, { duration: 200 });
    }

    return () => {
      // Cleanup logic
    };
  }, [
    height,
    scanHeight,
    duration,
    pauseDuration,
    loading,
    progress,
    scanBarOpacity,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value }],
      opacity: scanBarOpacity.value,
    };
  });

  return (
    <View style={[styles.wrapper, style]}>
      <Image {...imageProps} style={[styles.image, imageStyle]} />
      {loading && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.scanBar,
            animatedStyle,
            { backgroundColor: scanColor, height: scanHeight },
          ]}
        />
      )}
    </View>
  );
};

export default ScanImage;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scanBar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
});
