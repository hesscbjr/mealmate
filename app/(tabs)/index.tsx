import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import PhotoList from "@/components/organisms/PhotoList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const themeBackgroundColor = useThemeColor({}, "background");
  const buttonIconColor = useThemeColor({}, "background");
  const borderBottomColor = useThemeColor({}, "icon");

  const handleNavigateToCapture = () => {
    router.push("/capture");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeBackgroundColor }]}
    >
      <View style={styles.innerContainer}>
        <View style={[styles.buttonContainer, { borderBottomColor }]}>
          <Button
            title="What's In The Kitchen?"
            icon={<Icon name="camera" size={18} color={buttonIconColor} />}
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
  buttonContainer: {
    padding: 15,
    borderBottomWidth: 1,
  },
  captureButton: {},
});
