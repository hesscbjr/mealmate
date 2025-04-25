import Button from "@/components/atoms/Button";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoneScreen() {
  const markComplete = useUserStore((state) => state.markOnboardingComplete);
  const name = useUserStore((state) => state.name);
  const themeBackground = useThemeColor({}, "background");
  const themeText = useThemeColor({}, "text");

  const handleFinish = () => {
    markComplete();
    router.replace("/(tabs)"); // Replace removes onboarding from history
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: themeText }]}>
          You're all set!
        </Text>
        <Text style={[styles.subtitle, { color: themeText }]}>
          Let's see what's cookin' in your kitchen
        </Text>
        <Button
          title="Let's Go!"
          onPress={handleFinish}
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
