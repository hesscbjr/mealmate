import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";

export default function ExploreScreen() {
  const handleClearUserState = async () => {
    try {
      await AsyncStorage.removeItem("mealmate:user");
      Alert.alert(
        "Storage Cleared",
        "User state has been cleared. Please reload the app."
      );
    } catch (error) {
      console.error("Failed to clear user state:", error);
      Alert.alert("Error", "Failed to clear user state.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>explore page</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Clear User State"
          onPress={handleClearUserState}
          variant="secondary"
          style={{ borderColor: "#FF6347", borderWidth: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
});
