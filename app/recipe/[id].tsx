import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useLayoutEffect, useMemo } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import ExpandableText from "@/components/molecules/ExpandableText";
import IconButton from "@/components/molecules/IconButton";
import IngredientsList from "@/components/molecules/IngredientsList";
import InstructionsList from "@/components/molecules/InstructionsList";
import RecipeError from "@/components/molecules/RecipeError";
import RecipeNotFound from "@/components/molecules/RecipeNotFound";
import RelatedRecipesList from "@/components/molecules/RelatedRecipesList/RelatedRecipesList";
import RecipeDetailSkeleton from "@/components/organisms/RecipeDetailSkeleton";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SpoonacularRecipe } from "@/services/spoonacular";
import { useRecipeStore } from "@/store/recipes";
import { parseAndLinkSummary } from "@/utils/textUtils";

export default function RecipeDetailScreen() {
  const { id, missedCount } = useLocalSearchParams<{
    id: string;
    missedCount?: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();

  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");
  const themeSubtleTextColor = useThemeColor({}, "icon");
  const themeTintColor = useThemeColor({}, "tint");
  const themeBorderColor = useThemeColor({}, "icon");
  const buttonTextColor = useThemeColor({}, "buttonText");
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
              toggleStar(recipeDetails as SpoonacularRecipe);
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

      <View style={styles.section}>
        <Text style={[styles.title, { color: themeTextColor }]}>
          {recipeDetails.title}
        </Text>
        <View style={styles.metaInfoContainer}>
          <Text
            style={[
              styles.infoText,
              { color: themeTextColor, marginRight: 15 },
            ]}
          >
            ⏱️ {recipeDetails.readyInMinutes} mins
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: themeTextColor, marginRight: 15 },
            ]}
          >
            🍽️ Serves {recipeDetails.servings}
          </Text>
          {missedCount && parseInt(missedCount, 10) > 0 && (
            <Text style={[styles.infoText, { color: themeTextColor }]}>
              🛒 {missedCount} missing
            </Text>
          )}
        </View>
        {summaryData?.fullSummary && (
          <View style={styles.summaryContentContainer}>
            <ExpandableText text={summaryData.fullSummary} initialLines={2} />
          </View>
        )}
      </View>

      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.length > 0 && (
          <IngredientsList
            ingredients={recipeDetails.extendedIngredients}
            titleColor={themeTextColor}
            itemColor={themeTextColor}
            borderColor={themeBorderColor}
          />
        )}

      <InstructionsList
        analyzedInstructions={recipeDetails.analyzedInstructions}
        rawInstructions={recipeDetails.instructions}
        titleColor={themeTextColor}
        setNameColor={themeTextColor}
        stepNumberColor={themeTintColor}
        stepTextColor={themeTextColor}
        borderColor={themeBorderColor}
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
        <RelatedRecipesList
          relatedRecipes={summaryData.relatedRecipes}
          titleColor={themeTextColor}
          linkColor={themeTintColor}
        />
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
  section: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryContentContainer: {
    marginBottom: 5,
  },
  metaInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sourceButtonContainer: {
    margin: 20,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
