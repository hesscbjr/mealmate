import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

// Get screen width
const screenWidth = Dimensions.get("window").width;
// Calculate image size (e.g., 50% of screen width)
const imageSize = screenWidth * 0.5;

/**
 * NoRecipesFound Component
 *
 * Displays a message and image indicating no recipes were found for the given ingredients.
 */
const NoRecipesFound: React.FC = () => {
  const router = useRouter();
  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTextColor = useThemeColor({}, "text");

  const handleTryAgain = () => {
    if (router.canGoBack()) {
      router.back();
    }
    // Optional: Add fallback if router.canGoBack() is false, e.g., navigate to home
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
      <Image
        source={require("@/assets/images/sad.png")} // Use the correct image
        style={styles.image}
      />
      <Text style={[styles.title, { color: themeTextColor }]}>
        No Recipes Found
      </Text>
      <Text style={[styles.message, { color: themeTextColor }]}>
        We couldn't find any recipes for the ingredients provided. Try adding
        more ingredients or take a clearer picture!
      </Text>
      <Button
        title="Try Again"
        onPress={handleTryAgain}
        variant="primary"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  image: {
    width: imageSize,
    height: imageSize,
    resizeMode: "contain",
    marginBottom: 30,
    opacity: 0.85, // Slightly adjusted opacity
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    minWidth: "50%",
    marginTop: 15,
  },
});

export default NoRecipesFound;
