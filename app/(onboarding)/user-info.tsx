import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserInfoScreen() {
  const [name, setName] = useState("");
  const storeSetName = useUserStore((state) => state.setName);
  const themeBackground = useThemeColor({}, "background");
  const themeText = useThemeColor({}, "text");

  const handleContinue = () => {
    if (name.trim()) {
      storeSetName(name.trim());
      router.push("/(onboarding)/done" as any); // Cast for type safety
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackground }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={[styles.title, { color: themeText }]}>
          What should we call you?
        </Text>
        <Input
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleContinue} // Allow submitting via keyboard
          style={styles.input}
        />
        <Button
          title="Next"
          onPress={handleContinue}
          variant="primary"
          disabled={!name.trim()} // Disable button if name is empty
          style={styles.button}
        />
      </KeyboardAvoidingView>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    minWidth: "60%",
  },
});
