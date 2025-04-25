import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import PhotoList from "@/components/organisms/PhotoList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const themeBackgroundColor = useThemeColor({}, "background");
  const buttonIconColor = useThemeColor({}, "background");
  const borderBottomColor = useThemeColor({}, "icon");

  const firstName = useUserStore((state) => state.firstName);

  const handleNavigateToCapture = () => {
    router.push("/capture");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.greetingText}>
          {`What's in the pantry today, ${firstName || "buddy"}?`}
        </Text>
        <View style={[styles.buttonContainer, { borderBottomColor }]}>
          <Button
            title="What's In The Kitchen?"
            iconLeft={<Icon name="camera" size={18} color={buttonIconColor} />}
            onPress={handleNavigateToCapture}
            variant="primary"
            style={styles.captureButton}
          />
        </View>

        <PhotoList numColumns={3} />
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
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    padding: 15,
    borderBottomWidth: 1,
  },
  captureButton: {},
});
