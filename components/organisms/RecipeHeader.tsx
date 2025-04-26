import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import IconButton from "@/components/molecules/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";

interface RecipeHeaderProps {
  title: string;
  readyInMinutes: number;
  servings: number;
  missedCount?: string;
  isStarred: boolean;
  onToggleStar: () => void;
  onBackPress: () => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  readyInMinutes,
  servings,
  missedCount,
  isStarred,
  onToggleStar,
  onBackPress,
}) => {
  const themeTintColor = useThemeColor({}, "tint");
  const themeTextColor = useThemeColor({}, "text");

  const parsedMissedCount = missedCount ? parseInt(missedCount, 10) : 0;

  return (
    <View style={styles.container}>
      <IconButton
        onPress={onBackPress}
        name="arrow-left"
        size={24}
        color={themeTintColor}
        iconSet="fa5"
        style={styles.backButton}
      />
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, { color: themeTextColor }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.metaInfoContainer}>
          <Text style={[styles.infoText, { color: themeTextColor }]}>
            ⏱️ {readyInMinutes}m
          </Text>
          <Text style={[styles.infoText, { color: themeTextColor }]}>
            🍽️ {servings}
          </Text>
          {parsedMissedCount > 0 && (
            <Text style={[styles.infoText, { color: themeTextColor }]}>
              🛒 {parsedMissedCount}
            </Text>
          )}
        </View>
      </View>
      <IconButton
        onPress={onToggleStar}
        name={isStarred ? "star" : "staro"}
        size={24}
        color={themeTintColor}
        iconSet="antdesign"
        style={styles.starButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Platform.OS === "ios" ? 15 : 10,
    paddingVertical: 10,
    height: 60, // Adjust height as needed
  },
  backButton: {
    marginRight: 10,
  },
  starButton: {
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  metaInfoContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  infoText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
});

export default RecipeHeader;
