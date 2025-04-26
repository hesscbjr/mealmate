import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useLayoutEffect, useMemo } from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import HorizontalDivider from "@/components/atoms/HorizontalDivider";
import Icon from "@/components/atoms/Icon";
import ExpandableText from "@/components/molecules/ExpandableText";
import IconButton from "@/components/molecules/IconButton";
import IngredientsList from "@/components/molecules/IngredientsList";
import InstructionsList from "@/components/molecules/InstructionsList";
import RecipeError from "@/components/molecules/RecipeError";
import RecipeNotFound from "@/components/molecules/RecipeNotFound";
import RecipeTitle from "@/components/molecules/RecipeTitle";
import RelatedRecipesList from "@/components/molecules/RelatedRecipesList";
import RecipeDetailSkeleton from "@/components/organisms/RecipeDetailSkeleton";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRecipeStore } from "@/store/recipes";
import { parseAndLinkSummary } from "@/utils/textUtils";

export default function RecipeDetailScreen() {
  const { id, missedCount } = useLocalSearchParams<{
    id: string;
    missedCount?: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();

  const {
    background: themeBackgroundColor,
    text: themeTextColor,
    tint: themeTintColor,
    icon: themeBorderColor,
  } = useThemeColor({}, ["background", "text", "tint", "icon"]);

  const { recipeDetails, loading, error, notFound } = useRecipeDetails(id);

  const summaryData = useMemo(() => {
    if (recipeDetails?.summary) {
      const parsed = parseAndLinkSummary(recipeDetails.summary);
      const fullSummary = parsed.summaryText;

      return {
        fullSummary,
        relatedRecipes: parsed.relatedRecipes,
      };
    }
    return null;
  }, [recipeDetails?.summary]);

  const { toggleStar } = useRecipeStore();
  const currentlyStarred = useRecipeStore((state) =>
    state.isStarred(recipeDetails?.id ?? -1)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <IconButton
          onPress={() => {
            if (recipeDetails) {
              toggleStar(recipeDetails);
            }
          }}
          name={currentlyStarred ? "star" : "staro"}
          size={24}
          color={themeTintColor}
          iconSet="antdesign"
          style={{ marginRight: Platform.OS === "ios" ? 10 : 0 }}
        />
      ),
      headerLeft: () => (
        <IconButton
          onPress={() => router.back()}
          name="arrow-left"
          size={24}
          color={themeTintColor}
          iconSet="fa5"
          style={{ marginLeft: Platform.OS === "ios" ? 10 : 0 }}
        />
      ),
    });
  }, [
    navigation,
    recipeDetails,
    currentlyStarred,
    toggleStar,
    themeTintColor,
    router,
  ]);

  const handleOpenSourceUrl = () => {
    if (recipeDetails?.sourceUrl) {
      WebBrowser.openBrowserAsync(recipeDetails.sourceUrl);
    }
  };

  if (loading) {
    return <RecipeDetailSkeleton themeBackgroundColor={themeBackgroundColor} />;
  }

  if (notFound) {
    return <RecipeNotFound />;
  }

  if (error || !recipeDetails) {
    return <RecipeError />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: recipeDetails.image }} style={styles.image} />

      <RecipeTitle
        title={recipeDetails.title}
        readyInMinutes={recipeDetails.readyInMinutes}
        servings={recipeDetails.servings}
        missedCount={missedCount}
      />

      {summaryData?.fullSummary && (
        <ExpandableText text={summaryData.fullSummary} initialLines={2} />
      )}

      {summaryData?.fullSummary &&
        recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <HorizontalDivider style={styles.divider} />
        )}

      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <IngredientsList ingredients={recipeDetails.extendedIngredients} />
        )}

      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 &&
        (recipeDetails.analyzedInstructions?.length > 0 ||
          recipeDetails.instructions) && (
          <HorizontalDivider style={styles.divider} />
        )}

      <InstructionsList
        analyzedInstructions={recipeDetails.analyzedInstructions}
        rawInstructions={recipeDetails.instructions}
      />

      {recipeDetails.sourceUrl && (
        <View style={styles.sourceButtonContainer}>
          <Button
            title="View Full Recipe Online"
            variant="primary"
            onPress={handleOpenSourceUrl}
            iconLeft={<Icon name="external-link-alt" size={16} />}
            activeOpacity={0.7}
          />
        </View>
      )}

      {summaryData && summaryData.relatedRecipes.length > 0 && (
        <RelatedRecipesList relatedRecipes={summaryData.relatedRecipes} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 250,
  },
  divider: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: "auto",
  },
  sourceButtonContainer: {
    margin: 20,
  },
});
