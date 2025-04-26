import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import OnboardingContainer from "@/components/organisms/OnboardingContainer";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

// Get screen width
const screenWidth = Dimensions.get("window").width;
// Calculate image size (e.g., 80% of screen width)
const imageSize = screenWidth * 0.8;

export default function WelcomeScreen() {
  const handleContinue = () => {
    router.push({ pathname: "/(onboarding)/user-info" });
  };

  return (
    <OnboardingContainer>
      <Image
        source={require("@/assets/images/welcome.png")}
        style={styles.welcomeImage}
      />
      <Text style={styles.title}>Welcome to MealMate!</Text>
      <Text style={styles.subtitle}>Your friendly AI kitchen companion.</Text>
      <Button
        title="Get Started"
        onPress={handleContinue}
        variant="primary"
        style={styles.button}
      />
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: imageSize,
    height: imageSize,
    resizeMode: "contain",
    marginBottom: 20,
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
