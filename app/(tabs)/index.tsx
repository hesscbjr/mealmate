import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Greeting from "@/components/molecules/Greeting";
import RecipeList from "@/components/organisms/RecipeList";
import StarredEmptyState from "@/components/organisms/StarredEmptyState";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRecipeStore } from "@/store/recipes";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define style types for clarity
type DynamicStyles = {
  container: ViewStyle;
  innerContainer: ViewStyle;
  buttonContainer: ViewStyle;
  captureButton: ViewStyle; // Keep even if empty for consistency
  starredSection: ViewStyle;
  sectionHeader: TextStyle;
};

// Function to generate styles dynamically based on theme colors
const getStyles = (
  themeBackgroundColor: string,
  borderBottomColor: string
): DynamicStyles =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeBackgroundColor, // Dynamic background color
    },
    innerContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    buttonContainer: {
      paddingBottom: 15,
      borderBottomWidth: StyleSheet.hairlineWidth, // Ensure border is visible
      borderBottomColor: borderBottomColor, // Dynamic border color
    },
    captureButton: {
      // Add any specific styles for the button itself if needed later
    },
    starredSection: {
      flex: 1,
      marginTop: 20,
      paddingBottom: 10,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
  });

const DEFAULT_GREETING_NAME = "buddy";

export default function HomeScreen() {
  const themeBackgroundColor = useThemeColor({}, "background");
  const buttonIconColor = useThemeColor({}, "buttonText");
  const borderBottomColor = useThemeColor({}, "icon");

  // Generate styles using the theme colors
  const styles = getStyles(themeBackgroundColor, borderBottomColor);

  const firstName = useUserStore((state) => state.firstName);
  const starredRecipes = useRecipeStore((state) => state.starred);

  const handleNavigateToCapture = useCallback(() => {
    router.push({ pathname: "/(capture)/capture" });
  }, []); // Empty dependency array

  return (
    // Use the dynamically generated styles
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Greeting name={firstName} />
        {/* Use the dynamically generated styles */}
        <View style={styles.buttonContainer}>
          <Button
            title="What's In The Kitchen?"
            iconLeft={<Icon name="camera" size={18} color={buttonIconColor} />}
            onPress={handleNavigateToCapture}
            variant="primary"
            style={styles.captureButton} // Apply consistent style object
          />
        </View>

        {/* Starred Recipes Section - Header always visible */}
        <View style={styles.starredSection}>
          <Text style={styles.sectionHeader}>
            Starred Recipes
            {starredRecipes.length > 0 ? ` (${starredRecipes.length})` : ""}
          </Text>
          {/* Conditionally render RecipeList or the new StarredEmptyState component */}
          {starredRecipes.length > 0 ? (
            <RecipeList recipes={starredRecipes} loading={false} error={null} />
          ) : (
            <StarredEmptyState /> // Use the extracted component
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
