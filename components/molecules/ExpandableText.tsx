import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ExpandableTextProps = {
  text: string;
  initialLines?: number;
  characterThreshold?: number;
};

const ExpandableText = ({
  text,
  initialLines = 2,
  characterThreshold = 80,
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { text: themeTextColor, link: linkColor } = useThemeColor({}, [
    "text",
    "link",
  ]);
  const canPotentiallyTruncate = text.length > characterThreshold;

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (!text) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: themeTextColor }]}
        numberOfLines={isExpanded ? undefined : initialLines}
      >
        {text}
      </Text>
      {canPotentiallyTruncate && (
        <Pressable onPress={toggleExpand} style={styles.button}>
          <Text style={[styles.buttonText, { color: linkColor }]}>
            {isExpanded ? "Show less" : "View full description"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
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
