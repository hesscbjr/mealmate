import React from "react";
import { View, ViewStyle } from "react-native";
import FadeInView from "./FadeInView"; // Import the existing FadeInView

interface StaggerProps {
  children: React.ReactNode;
  /** Initial delay before the first child starts animating. */
  parentDelay?: number;
  /** Delay between each subsequent child's animation start. */
  stagger?: number;
  /** Duration of the fade-in animation for each child. */
  duration?: number;
  /** Optional style for the container View wrapping children. */
  style?: ViewStyle;
}

const Stagger: React.FC<StaggerProps> = ({
  children,
  parentDelay = 0,
  stagger = 150, // Default stagger delay
  duration = 500, // Default duration from FadeInView
  style,
}) => {
  return (
    // Apply the style prop to this wrapping View
    <View style={style}>
      {React.Children.map(children, (child, index) => {
        // Assume child is always a ReactElement now
        const childDelay = parentDelay + index * stagger;
        // Use the child's own key if available, otherwise fall back to index
        // Need to cast child as ReactElement to safely access key without the check
        const key = (child as React.ReactElement).key ?? index;
        return (
          <FadeInView key={key} delay={childDelay} duration={duration}>
            {child}
          </FadeInView>
        );
      })}
    </View>
  );
};

export default Stagger;
