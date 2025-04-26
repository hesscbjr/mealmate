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

type DynamicStyles = {
  container: ViewStyle;
  innerContainer: ViewStyle;
  buttonContainer: ViewStyle;
  starredSection: ViewStyle;
  sectionHeader: TextStyle;
};

const getStyles = (
  themeBackgroundColor: string,
  borderBottomColor: string
): DynamicStyles =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeBackgroundColor,
    },
    innerContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    buttonContainer: {
      paddingBottom: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: borderBottomColor,
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

export default function HomeScreen() {
  const themeBackgroundColor = useThemeColor({}, "background");
  const buttonIconColor = useThemeColor({}, "buttonText");
  const borderBottomColor = useThemeColor({}, "icon");

  const styles = getStyles(themeBackgroundColor, borderBottomColor);

  const firstName = useUserStore((state) => state.firstName);
  const starredRecipes = useRecipeStore((state) => state.starred);

  const handleNavigateToCapture = useCallback(() => {
    router.push({ pathname: "/(capture)/capture" });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Greeting name={firstName} />
        <View style={styles.buttonContainer}>
          <Button
            title="What's In The Kitchen?"
            iconLeft={<Icon name="camera" size={18} color={buttonIconColor} />}
            onPress={handleNavigateToCapture}
            variant="primary"
          />
        </View>

        <View style={styles.starredSection}>
          <Text style={styles.sectionHeader}>
            Starred Recipes
            {starredRecipes.length > 0 ? ` (${starredRecipes.length})` : ""}
          </Text>
          {starredRecipes.length > 0 ? (
            <RecipeList recipes={starredRecipes} loading={false} error={null} />
          ) : (
            <StarredEmptyState />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
