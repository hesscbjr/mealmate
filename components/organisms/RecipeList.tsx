import {
  FlashList,
  ListRenderItemInfo as FlashListRenderItemInfo,
} from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/atoms/Text";
import NoRecipesFound from "@/components/molecules/NoRecipesFound";
import RecipeCard from "@/components/molecules/RecipeCard";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";

type RecipeListProps = {
  recipes: SpoonacularRecipe[] | null;
  loading?: boolean;
  error?: string | null;
};

const skeletonData = Array.from({ length: 5 }, (_, i) => ({
  id: `skeleton-${i}`,
}));

type ListItem = SpoonacularRecipe | { id: string };

const RecipeList = ({
  recipes,
  loading = false,
  error = null,
}: RecipeListProps) => {
  const themeBackgroundColor = useThemeColor({}, "background");

  const renderItem = ({ item }: FlashListRenderItemInfo<ListItem>) => {
    if (loading) {
      return <RecipeCard loading={true} style={styles.recipeCardMargin} />;
    } else {
      return (
        <RecipeCard
          recipe={item as SpoonacularRecipe}
          style={styles.recipeCardMargin}
        />
      );
    }
  };

  const estimatedItemHeight = 120;

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

  if (!loading && (!recipes || recipes.length === 0)) {
    return <NoRecipesFound />;
  }

  const data = loading ? skeletonData : recipes;

  return (
    <View
      style={[styles.listWrapper, { backgroundColor: themeBackgroundColor }]}
    >
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    paddingVertical: 10,
  },
  listWrapper: {
    flex: 1,
    width: "100%",
  },
  recipeCardMargin: {
    marginBottom: 24,
  },
});

export default RecipeList;
