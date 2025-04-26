import {
  FlashList,
  ListRenderItemInfo as FlashListRenderItemInfo,
} from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/atoms/Text";
import RecipeCard from "@/components/molecules/RecipeCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";

interface RecipeListProps {
  recipes: SpoonacularRecipe[] | null;
  loading?: boolean;
  error?: string | null;
  // Add refresh/pagination handlers if needed later
}

// Dummy data for skeleton loading state (5 items)
const skeletonData = Array.from({ length: 5 }, (_, i) => ({
  id: `skeleton-${i}`,
}));

type ListItem = SpoonacularRecipe | { id: string };

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  loading = false,
  error = null,
}) => {
  const themeBackgroundColor = useThemeColor({}, "background");
  // const themeTintColor = useThemeColor({}, "tint"); // Tint color no longer needed here

  const renderItem = ({ item }: FlashListRenderItemInfo<ListItem>) => {
    if (loading) {
      // Render skeleton card if loading
      return <RecipeCard loading={true} style={{ marginBottom: 24 }} />;
    } else {
      // Render actual recipe card if not loading
      return (
        <RecipeCard
          recipe={item as SpoonacularRecipe}
          style={{ marginBottom: 24 }}
        />
      );
    }
  };

  // Estimated item height - adjust as needed for performance
  const estimatedItemHeight = 120; // Should be roughly the same for skeleton and real card

  // Error state handling
  if (error) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={styles.errorText}>{error}</Text>
        <Text style={[styles.infoText, { marginTop: 10 }]}>
          Please check your connection or try again.
        </Text>
      </View>
    );
  }

  // Empty state handling (when not loading and no recipes)
  if (!loading && (!recipes || recipes.length === 0)) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={styles.infoText}>
          No recipes found for these ingredients.
        </Text>
      </View>
    );
  }

  // Determine data source based on loading state
  const data = loading ? skeletonData : recipes;

  return (
    <View
      style={[styles.listWrapper, { backgroundColor: themeBackgroundColor }]} // Ensure wrapper takes full space
    >
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Use recipe ID or skeleton ID as key
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
  },
  listWrapper: {
    flex: 1, // Make sure the wrapper fills available space
  },
});

export default RecipeList;
