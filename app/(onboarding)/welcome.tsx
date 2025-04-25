import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Text from "@/components/atoms/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const themeBackground = useThemeColor({}, "background");

  const handleContinue = () => {
    router.push("/(onboarding)/user-info" as any);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <View style={styles.content}>
        <FadeInView delay={0}>
          <Image
            source={require("@/assets/images/welcome.png")}
            style={styles.welcomeImage}
          />
        </FadeInView>
        <FadeInView delay={300}>
          <Text style={styles.title}>Welcome to MealMate!</Text>
        </FadeInView>
        <FadeInView delay={300}>
          <Text style={styles.subtitle}>
            Your friendly AI kitchen companion.
          </Text>
        </FadeInView>
        <FadeInView delay={900}>
          <Button
            title="Get Started"
            onPress={handleContinue}
            variant="primary"
            style={styles.button}
          />
        </FadeInView>
      </View>
    </SafeAreaView>
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
  welcomeImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
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
