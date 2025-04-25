import { RecipeIngredient } from "@/services/spoonacular"; // Assuming RecipeIngredient is exported
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface IngredientsListProps {
  ingredients: RecipeIngredient[];
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  itemColor?: string;
  borderColor?: string;
}

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  style,
  titleStyle,
  itemStyle,
  titleColor = "#000", // Default colors, will be overridden by theme
  itemColor = "#000",
  borderColor = "#ccc",
}) => {
  if (!ingredients || ingredients.length === 0) {
    return null; // Don't render anything if no ingredients
  }

  return (
    <View style={[styles.section, { borderTopColor: borderColor }, style]}>
      <Text style={[styles.sectionTitle, { color: titleColor }, titleStyle]}>
        Ingredients
      </Text>
      {ingredients.map((ing, index) => (
        <Text
          key={`ing-${index}`}
          style={[styles.listItem, { color: itemColor }, itemStyle]}
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
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor will be set dynamically via props
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
