import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useMemo, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";

import BottomSheet from "@/components/atoms/BottomSheet";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";

export default function ExploreScreen() {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
  };

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
    <>
      <View style={styles.container}>
        <Text>explore page</Text>

        <View style={styles.buttonContainer}>
          <Button title="Open Bottom Sheet" onPress={handleOpenSheet} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Clear User State"
            onPress={handleClearUserState}
            variant="secondary"
            style={{ borderColor: "#FF6347", borderWidth: 1 }}
          />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: "#f0f0f0" }}
        handleIndicatorStyle={{ backgroundColor: "#ccc" }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.sheetText}>Hello from the Bottom Sheet! 👋</Text>
          <Button title="Close Sheet" onPress={handleCloseSheet} />
        </View>
      </BottomSheet>
    </>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  sheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
