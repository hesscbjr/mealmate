import BottomSheet from "@/components/atoms/BottomSheet";
import Button from "@/components/atoms/Button";
import FadeInView from "@/components/atoms/FadeInView";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import DietaryRestrictionPicker from "@/components/organisms/DietaryRestrictionPicker";
import { Colors } from "@/constants/Colors";
import { useUserStore } from "@/store/user";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

export default function UserInfoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const storeSetFirstName = useUserStore((state) => state.setFirstName);
  const storeSetLastName = useUserStore((state) => state.setLastName);
  const colorScheme = useColorScheme();

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

  const gradientColors =
    colorScheme === "dark"
      ? ([
          Colors.dark.backgroundGradientStart,
          Colors.dark.backgroundGradientEnd,
        ] as const)
      : ([
          Colors.light.backgroundGradientStart,
          Colors.light.backgroundGradientEnd,
        ] as const);

  const gradientLocations = [0, 0.6] as const;

  const buttonIconColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.background;
  const bottomSheetBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const Content = (
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

      {/* <FadeInView delay={600} style={styles.prefsButtonContainer}>
        <Button
          title="Add Dietary Preferences"
          onPress={handleOpenSheet}
          variant="default"
          style={styles.prefsButton}
          disabled={!canProceed}
        />
      </FadeInView> */}
      <FadeInView delay={900} style={styles.nextButtonContainer}>
        <Button
          title="Next"
          onPress={handleContinue}
          variant="primary"
          disabled={!canProceed}
          style={styles.button}
          iconRight={
            <Icon name="arrow-right" size={16} color={buttonIconColor} />
          }
        />
      </FadeInView>
    </View>
  );

  return (
    <>
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        style={styles.container}
      >
        {Content}
      </LinearGradient>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: bottomSheetBgColor }}
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
