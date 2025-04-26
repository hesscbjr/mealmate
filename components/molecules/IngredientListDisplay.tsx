import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { formatIngredientList } from "@/utils/formatters";
import React from "react";
import { StyleSheet, View } from "react-native";

type IngredientListDisplayProps = {
  ingredients: string[];
};

const IngredientListDisplay = ({ ingredients }: IngredientListDisplayProps) => {
  const { text: themeTextColor } = useThemeColor({}, ["text"]);

  return (
    <View style={styles.ingredientTextContainer}>
      <Text style={[styles.ingredientHeader, { color: themeTextColor }]}>
        <Icon
          name="shopping-cart"
          size={16}
          style={styles.iconStyle}
          color={themeTextColor}
        />{" "}
        Ingredients:{" "}
        <Text style={[styles.ingredientValue, { color: themeTextColor }]}>
          {formatIngredientList(ingredients)}
        </Text>
      </Text>
    </View>
  );
};

export default IngredientListDisplay;

const styles = StyleSheet.create({
  ingredientTextContainer: {
    paddingTop: 10,
    minHeight: 40,
    paddingHorizontal: 15,
  },
  ingredientHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientValue: {
    fontWeight: "normal",
  },
  iconStyle: {
    marginRight: 5,
  },
});
