import React, { useCallback, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";

interface ExpandableTextProps {
  text: string;
  initialLines?: number;
  textStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonColor?: string;
  characterThreshold?: number; // Threshold to decide if button is needed
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  initialLines = 2,
  textStyle,
  buttonTextStyle,
  buttonColor = "#007AFF", // Default color similar to tint
  characterThreshold = 80,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const canPotentiallyTruncate = text.length > characterThreshold;

  const toggleExpand = useCallback(() => {
    // No animation
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  if (!text) {
    return null; // Return null if no text is provided
  }

  return (
    <View>
      {/* No Animated.View needed, just render the text */}
      <Text
        style={[styles.text, textStyle]}
        numberOfLines={isExpanded ? undefined : initialLines}
      >
        {text}
      </Text>
      {/* Only show button if text might be truncated */}
      {canPotentiallyTruncate && (
        <Pressable onPress={toggleExpand} style={styles.button}>
          <Text
            style={[styles.buttonText, { color: buttonColor }, buttonTextStyle]}
          >
            {isExpanded ? "Show less" : "View full description"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5, // Default space before button if shown
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
    // No underline by default, can be added via prop
  },
});

export default ExpandableText;
