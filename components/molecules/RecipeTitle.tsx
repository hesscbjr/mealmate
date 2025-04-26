import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type RecipeTitleProps = {
  title: string;
  readyInMinutes: number;
  servings: number;
  missedCount?: string;
};

const RecipeTitle = ({
  title,
  readyInMinutes,
  servings,
  missedCount,
}: RecipeTitleProps) => {
  const themeTextColor = useThemeColor({}, "text");

  const parsedMissedCount = missedCount ? parseInt(missedCount, 10) : 0;
  const showMissedCount = parsedMissedCount > 0;

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: themeTextColor }]}>{title}</Text>
      <View style={styles.metaInfoContainer}>
        <Text
          style={[styles.infoText, { color: themeTextColor, marginRight: 15 }]}
        >
          ⏱️ {readyInMinutes} mins
        </Text>
        <Text
          style={[styles.infoText, { color: themeTextColor, marginRight: 15 }]}
        >
          🍽️ Serves {servings}
        </Text>
        {showMissedCount && (
          <Text style={[styles.infoText, { color: themeTextColor }]}>
            🛒 {parsedMissedCount} missing
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
  },
});

export default RecipeTitle;
