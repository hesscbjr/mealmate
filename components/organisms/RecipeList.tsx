import {
  FlashList,
  ListRenderItemInfo as FlashListRenderItemInfo,
} from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import RecipeCard from "@/components/molecules/RecipeCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";

interface RecipeListProps {
  recipes: SpoonacularRecipe[] | null;
  loading?: boolean;
  error?: string | null;
  // Add refresh/pagination handlers if needed later
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  loading = false,
  error = null,
}) => {
  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeTintColor = useThemeColor({}, "tint");

  const renderItem = ({ item }: FlashListRenderItemInfo<SpoonacularRecipe>) => (
    <RecipeCard recipe={item} style={{ marginBottom: 24 }} />
  );

  // Estimated item height - adjust as needed for performance
  const estimatedItemHeight = 120;

  if (loading) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color={themeTintColor} />
        <Text
          style={[styles.infoText, { color: themeTextColor, marginTop: 10 }]}
        >
          Fetching recipes...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={[styles.errorText, { color: themeTextColor }]}>
          {error}
        </Text>
        <Text
          style={[styles.infoText, { color: themeTextColor, marginTop: 10 }]}
        >
          Please check your connection or try again.
        </Text>
      </View>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={[styles.infoText, { color: themeTextColor }]}>
          No recipes found for these ingredients.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.listWrapper, { backgroundColor: themeBackgroundColor }]}
    >
      <FlashList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Use recipe ID as key
        estimatedItemSize={estimatedItemHeight}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
  listContentContainer: {
    paddingVertical: 10, // Add vertical padding for the list
    paddingHorizontal: 5, // Add horizontal padding slightly
  },
  listWrapper: {
    flex: 1,
  },
});

export default RecipeList;
