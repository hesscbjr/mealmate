import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth * 0.6;

type RecipeNotFoundProps = {};

const RecipeNotFound = ({}: RecipeNotFoundProps) => {
  const router = useRouter();
  const { background: themeBackground, text: themeText } = useThemeColor({}, [
    "background",
    "text",
  ]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackground }]}>
      <Image
        source={require("@/assets/images/not-found.png")}
        style={styles.notFoundImage}
      />
      <Text style={[styles.title, { color: themeText }]}>Recipe Not Found</Text>
      <Text style={[styles.message, { color: themeText }]}>
        Sorry, we couldn't find the recipe you were looking for. It might have
        been removed or the link might be incorrect.
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

export default RecipeNotFound;
