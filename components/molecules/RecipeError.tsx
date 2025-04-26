import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth * 0.6;

const RecipeError = () => {
  const router = useRouter();
  const { background: themeBackgroundColor, text: themeTextColor } =
    useThemeColor({}, ["background", "text"]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
      <Image
        source={require("@/assets/images/not-found.png")}
        style={styles.notFoundImage}
      />
      <Text style={[styles.title, { color: themeTextColor }]}>
        Something Went Wrong
      </Text>
      <Text style={[styles.message, { color: themeTextColor }]}>
        Sorry, we encountered an error while trying to load the recipe. Please
        try again later or go back.
      </Text>
      <Button
        title="Go Back"
        onPress={handleGoBack}
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
  notFoundImage: {
    width: imageSize,
    height: imageSize,
    resizeMode: "contain",
    marginBottom: 30,
    opacity: 0.9,
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
  },
});

export default RecipeError;
