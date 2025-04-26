import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface RelatedRecipe {
  id: string;
  title: string;
}

type RelatedRecipesListProps = {
  relatedRecipes: RelatedRecipe[];
};

const RelatedRecipesList = ({ relatedRecipes }: RelatedRecipesListProps) => {
  const router = useRouter();
  const { text: titleColor, link: linkColor } = useThemeColor({}, [
    "text",
    "link",
  ]);

  if (!relatedRecipes || relatedRecipes.length === 0) {
    return null;
  }

  const sectionTitleStyle = [styles.sectionTitle, { color: titleColor }];
  const linkTextStyle = [styles.relatedRecipeLinkText, { color: linkColor }];

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>Related Recipes</Text>
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
          <Text style={linkTextStyle}>• {relatedRecipe.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 15,
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
