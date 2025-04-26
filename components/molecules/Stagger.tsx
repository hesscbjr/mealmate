import FadeInView from "@/components/atoms/FadeInView";
import React from "react";
import { View, ViewStyle } from "react-native";

type StaggerProps = {
  children: React.ReactNode;
  parentDelay?: number;
  stagger?: number;
  duration?: number;
  style?: ViewStyle;
};

const Stagger = ({
  children,
  parentDelay = 0,
  stagger = 150,
  duration = 500,
  style,
}: StaggerProps) => {
  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => {
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
