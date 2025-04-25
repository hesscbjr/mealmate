import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Text from "@/components/atoms/Text";
import { Colors } from "@/constants/Colors";
import { useUserStore } from "@/store/user";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View, useColorScheme } from "react-native";

export default function DoneScreen() {
  const markComplete = useUserStore((state) => state.markOnboardingComplete);
  const colorScheme = useColorScheme();

  const handleFinish = () => {
    markComplete();
    router.replace("/(tabs)"); // Replace removes onboarding from history
  };

  const gradientColors =
    colorScheme === "dark"
      ? ([
          Colors.dark.backgroundGradientStart,
          Colors.dark.backgroundGradientEnd,
        ] as const)
      : ([
          Colors.light.backgroundGradientStart,
          Colors.light.backgroundGradientEnd,
        ] as const);

  const gradientLocations = [0, 0.6] as const;

  // Render gradient for both light and dark modes
  return (
    <LinearGradient
      colors={gradientColors}
      locations={gradientLocations}
      style={styles.container}
    >
      <View style={styles.content}>
        <FadeInView delay={0}>
          <Image
            source={require("@/assets/images/done.png")}
            style={styles.doneImage}
          />
        </FadeInView>
        <FadeInView delay={300}>
          <Text style={styles.title}>You're all set!</Text>
        </FadeInView>
        <FadeInView delay={300}>
          <Text style={styles.subtitle}>
            Let's see what's cookin' in your kitchen
          </Text>
        </FadeInView>
        <FadeInView delay={900}>
          <Button
            title="Let's Go!"
            onPress={handleFinish}
            variant="primary"
            style={styles.button}
          />
        </FadeInView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 140,
  },
  doneImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    minWidth: "60%",
  },
});
