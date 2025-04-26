import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import OnboardingContainer from "@/components/organisms/OnboardingContainer";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";

export default function DoneScreen() {
  const markOnboardingComplete = useUserStore(
    (state) => state.markOnboardingComplete
  );

  const handleFinish = () => {
    markOnboardingComplete();
    router.replace("/(tabs)");
  };

  return (
    <OnboardingContainer>
      <Image
        source={require("@/assets/images/done.png")}
        style={styles.doneImage}
      />
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>
        Let's see what's cookin' in your kitchen
      </Text>
      <Button
        title="Let's Go!"
        onPress={handleFinish}
        variant="primary"
        style={styles.button}
      />
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
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
