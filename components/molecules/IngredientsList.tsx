import { useThemeColor } from "@/hooks/useThemeColor";
import { RecipeIngredient } from "@/services/spoonacular";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type IngredientsListProps = {
  ingredients: RecipeIngredient[];
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<TextStyle>;
};

const IngredientsList = ({
  ingredients,
  style,
  titleStyle,
  itemStyle,
}: IngredientsListProps) => {
  const { text: themeText } = useThemeColor({}, ["text"]);

  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  return (
    <View style={[styles.section, style]}>
      <Text style={[styles.sectionTitle, { color: themeText }, titleStyle]}>
        Ingredients
      </Text>
      {ingredients.map((ing, index) => (
        <Text
          key={`ing-${index}`}
          style={[styles.listItem, { color: themeText }, itemStyle]}
        >
          • {ing.original}
        </Text>
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
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default IngredientsList;
