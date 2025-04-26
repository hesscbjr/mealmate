import Text from "@/components/atoms/Text";
import RecipeList from "@/components/organisms/RecipeList";
import StarredEmptyState from "@/components/organisms/StarredEmptyState";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StarredRecipesSectionProps {
  starredRecipes: SpoonacularRecipe[];
}

const StarredRecipesSection = ({
  starredRecipes,
}: StarredRecipesSectionProps) => {
  const { text } = useThemeColor({}, ["text"]);

  return (
    <View style={styles.starredSection}>
      <Text style={[styles.sectionHeader, { color: text }]}>
        Starred Recipes
        {starredRecipes.length > 0 ? ` (${starredRecipes.length})` : ""}
      </Text>
      {starredRecipes.length > 0 ? (
        <RecipeList recipes={starredRecipes} loading={false} error={null} />
      ) : (
        <StarredEmptyState />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  starredSection: {
    flex: 1,
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default StarredRecipesSection;
