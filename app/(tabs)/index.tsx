import Button from "@/components/atoms/Button";
import HorizontalDivider from "@/components/atoms/HorizontalDivider";
import Icon from "@/components/atoms/Icon";
import Greeting from "@/components/molecules/Greeting";
import StarredRecipesSection from "@/components/organisms/StarredRecipesSection";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRecipeStore } from "@/store/recipes";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { background: themeBackgroundColor, buttonText: buttonIconColor } =
    useThemeColor({}, ["background", "buttonText"]);

  const starredRecipes = useRecipeStore((state) => state.starred);

  const handleNavigateToCapture = useCallback(() => {
    router.push({ pathname: "/(capture)/capture" });
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
    >
      <View style={styles.innerContainer}>
        <Greeting />
        <Button
          title="What's In The Kitchen?"
          iconLeft={<Icon name="camera" size={18} color={buttonIconColor} />}
          onPress={handleNavigateToCapture}
          variant="primary"
        />
        <HorizontalDivider style={styles.divider} />

        <StarredRecipesSection starredRecipes={starredRecipes} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  divider: {
    marginVertical: 30,
    marginHorizontal: 30,
    width: "auto",
  },
});
