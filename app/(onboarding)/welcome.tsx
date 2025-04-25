import Button from "@/components/atoms/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const themeBackground = useThemeColor({}, "background");
  const themeText = useThemeColor({}, "text");

  const handleContinue = () => {
    router.push("/(onboarding)/user-info" as any);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: themeText }]}>
          Welcome to MealMate!
        </Text>
        <Text style={[styles.subtitle, { color: themeText }]}>
          Your friendly AI kitchen companion.
        </Text>
        <Button
          title="Get Started"
          onPress={handleContinue}
          variant="primary"
          style={styles.button}
        />
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
