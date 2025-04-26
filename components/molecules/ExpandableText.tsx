import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

interface ExpandableTextProps {
  text: string;
  initialLines?: number;
  characterThreshold?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  initialLines = 2,
  characterThreshold = 80,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { text: themeTextColor } = useThemeColor({}, ["text"]);
  const canPotentiallyTruncate = text.length > characterThreshold;

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  if (!text) {
    return null;
  }

  return (
    <View>
      <Text
        style={[styles.text, { color: themeTextColor }]}
        numberOfLines={isExpanded ? undefined : initialLines}
      >
        {text}
      </Text>
      {canPotentiallyTruncate && (
        <Pressable onPress={toggleExpand} style={styles.button}>
          <Text style={[styles.buttonText]}>
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
    marginBottom: 5,
  },
  button: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default ExpandableText;
