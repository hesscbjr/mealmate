import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type ColorValue,
} from "react-native";

// Assuming RelatedRecipe type is available, if not, define it here or import it
// If it's defined in textUtils, ensure it's exported from there.
export interface RelatedRecipe {
  id: string;
  title: string;
}

interface RelatedRecipesListProps {
  relatedRecipes: RelatedRecipe[];
  titleColor: ColorValue;
  linkColor: ColorValue;
}

const RelatedRecipesList: React.FC<RelatedRecipesListProps> = ({
  relatedRecipes,
  titleColor,
  linkColor,
}) => {
  const router = useRouter();

  if (!relatedRecipes || relatedRecipes.length === 0) {
    return null; // Don't render anything if there are no related recipes
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: titleColor }]}>
        Related Recipes
      </Text>
      {relatedRecipes.map((relatedRecipe) => (
        <Pressable
          key={relatedRecipe.id}
          onPress={() => {
            router.push({
              pathname: "/recipe/[id]",
              params: { id: relatedRecipe.id },
            });
          }}
          style={styles.relatedRecipeLinkContainer}
        >
          <Text
            style={[
              styles.relatedRecipeLinkText,
              { color: linkColor }, // Apply link color prop
            ]}
          >
            • {relatedRecipe.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 15,
    // Removed borderTopWidth as it might belong to the parent section
    // If needed specifically for this component, add it back or pass via style prop
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  relatedRecipeLinkContainer: {
    marginBottom: 8,
    marginLeft: 5,
  },
  relatedRecipeLinkText: {
    fontSize: 16,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
});

export default RelatedRecipesList;
