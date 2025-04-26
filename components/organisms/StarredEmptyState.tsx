import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth * 0.4;

const StarredEmptyState = () => {
  const { text: themeText } = useThemeColor({}, ["text"]);

  return (
    <View style={styles.emptyStateContainer}>
      <Text style={[styles.emptyListText, { color: themeText }]}>
        No starred recipes yet. Hit 'What's in the kitchen' to get started!
      </Text>
      <Image
        source={require("@/assets/images/sad.png")}
        style={styles.emptyListImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default StarredEmptyState;

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 40,
  },
  emptyListImage: {
    width: imageSize,
    height: imageSize,
    marginTop: 15,
  },
});
