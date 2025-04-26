import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { formatIngredientList } from "@/utils/formatters";
import React from "react";
import { StyleSheet, View } from "react-native";

interface IngredientListDisplayProps {
  ingredients: string[];
}

const IngredientListDisplay: React.FC<IngredientListDisplayProps> = ({
  ingredients,
}) => {
  const { text: themeTextColor } = useThemeColor({}, ["text"]);

  const styles = StyleSheet.create({
    ingredientTextContainer: {
      paddingTop: 10,
      minHeight: 40,
      paddingHorizontal: 15,
    },
    ingredientHeader: {
      fontSize: 16,
      fontWeight: "bold",
      color: themeTextColor,
    },
    ingredientValue: {
      fontWeight: "normal",
      color: themeTextColor,
    },
  });

  return (
    <View style={styles.ingredientTextContainer}>
      <Text style={styles.ingredientHeader}>
        🛒 Ingredients:{" "}
        <Text style={styles.ingredientValue}>
          {formatIngredientList(ingredients)}
        </Text>
      </Text>
    </View>
  );
};

export default IngredientListDisplay;
