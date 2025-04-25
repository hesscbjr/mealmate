import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import RecipeList from "@/components/organisms/RecipeList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRecipeStore } from "@/store/recipes";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const themeBackgroundColor = useThemeColor({}, "background");
  const buttonIconColor = useThemeColor({}, "background");
  const borderBottomColor = useThemeColor({}, "icon");

  const firstName = useUserStore((state) => state.firstName);
  const starredRecipes = useRecipeStore((state) => state.starred);

  const handleNavigateToCapture = () => {
    router.push("/capture");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.greetingText}>
          {`What's in the pantry today, ${firstName || "buddy"}?`}
        </Text>
        <View style={[styles.buttonContainer, { borderBottomColor }]}>
          <Button
            title="What's In The Kitchen?"
            iconLeft={<Icon name="camera" size={18} color={buttonIconColor} />}
            onPress={handleNavigateToCapture}
            variant="primary"
            style={styles.captureButton}
          />
        </View>

        {/* Starred Recipes Section - Header always visible */}
        <View style={styles.starredSection}>
          <Text style={styles.sectionHeader}>Starred Recipes</Text>
          {/* Conditionally render RecipeList or an empty state message */}
          {starredRecipes.length > 0 ? (
            <RecipeList recipes={starredRecipes} loading={false} error={null} />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyListText}>
                No starred recipes yet! Hit 'What's in the kitchen' to get
                started!
              </Text>
              <Image
                source={require("@/assets/images/no-starred-recipes.png")}
                style={styles.emptyListImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    paddingBottom: 15,
  },
  captureButton: {},
  starredSection: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15, // Space below header
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888", // Or use a theme color
  },
  emptyStateContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyListImage: {
    width: 150,
    height: 150,
    marginTop: 15,
  },
});
