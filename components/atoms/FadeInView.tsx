import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 500,
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, delay, duration]);

  return (
    <Animated.View
      style={[
        { width: "100%", alignItems: "center" },
        style,
        { opacity: fadeAnim },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
