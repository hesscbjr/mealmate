import BottomSheet from "@/components/atoms/BottomSheet";
import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import DietaryRestrictionPicker from "@/components/organisms/DietaryRestrictionPicker";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserInfoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const storeSetFirstName = useUserStore((state) => state.setFirstName);
  const storeSetLastName = useUserStore((state) => state.setLastName);
  const themeBackground = useThemeColor({}, "background");

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = useMemo(() => ["55%", "85%"], []);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const canProceed = firstName.trim() !== "" && lastName.trim() !== "";

  const handleContinue = () => {
    if (canProceed) {
      storeSetFirstName(firstName.trim());
      storeSetLastName(lastName.trim());
      router.push("/(onboarding)/done" as any);
    }
  };

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: themeBackground }]}
      >
        <View style={styles.content}>
          <FadeInView delay={0}>
            <Text style={styles.title}>What should we call you?</Text>
          </FadeInView>

          <FadeInView delay={300} style={styles.nameInputGroup}>
            <Input
              label="First Name"
              placeholder="Your First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              returnKeyType="next"
              containerStyle={styles.nameInputContainer}
            />
            <Input
              label="Last Name"
              placeholder="Your Last Name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              returnKeyType="next"
              containerStyle={styles.nameInputContainer}
            />
          </FadeInView>

          <FadeInView delay={600} style={styles.prefsButtonContainer}>
            <Button
              title="Add Dietary Preferences"
              onPress={handleOpenSheet}
              variant="default"
              style={styles.prefsButton}
              disabled={!canProceed}
            />
          </FadeInView>
          <FadeInView delay={900} style={styles.nextButtonContainer}>
            <Button
              title="Next"
              onPress={handleContinue}
              variant="primary"
              disabled={!canProceed}
              style={styles.button}
              iconRight={
                <Icon name="arrow-right" size={16} color={themeBackground} />
              }
            />
          </FadeInView>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: themeBackground }}
      >
        <DietaryRestrictionPicker />
      </BottomSheet>
    </>
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
  nameInputGroup: {
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  nameInputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  prefsButtonContainer: {
    width: "80%",
    marginBottom: 20,
  },
  prefsButton: {},
  nextButtonContainer: {
    minWidth: "60%",
    marginTop: 10,
  },
  button: {},
});
