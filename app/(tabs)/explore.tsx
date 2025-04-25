import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

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
          color="#FF6347"
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
  },
  buttonContainer: {
    marginTop: 20,
  },
});
