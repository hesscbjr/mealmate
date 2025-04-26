import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth * 0.4;

type NoRecipesFoundProps = {};

const NoRecipesFound = ({}: NoRecipesFoundProps) => {
  const router = useRouter();
  const { background: themeBackgroundColor, text: themeTextColor } =
    useThemeColor({}, ["background", "text"]);

  const handleTryAgain = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeBackgroundColor }]}>
      <Image source={require("@/assets/images/sad.png")} style={styles.image} />
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
    marginBottom: 10,
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
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    minWidth: "50%",
  },
});

export default NoRecipesFound;
