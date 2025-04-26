import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import OnboardingContainer from "@/components/organisms/OnboardingContainer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function UserInfoScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const setFullName = useUserStore((state) => state.setFullName);
  const buttonIconColor = useThemeColor({}, "buttonText");
  const lastNameRef = useRef<TextInput>(null);

  const canProceed = firstName.trim() !== "" && lastName.trim() !== "";

  const handleContinue = () => {
    if (canProceed) {
      setFullName(firstName.trim(), lastName.trim());
      router.push({ pathname: "/(onboarding)/done" });
    }
  };

  return (
    <OnboardingContainer>
      <Text style={styles.title}>What should we call you?</Text>

      <View style={styles.nameInputGroup}>
        <Input
          label="First Name"
          placeholder="Your First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          returnKeyType="next"
          containerStyle={styles.nameInputContainer}
          onSubmitEditing={() => lastNameRef.current?.focus()}
        />
        <Input
          ref={lastNameRef}
          label="Last Name"
          placeholder="Your Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
          returnKeyType="done"
          containerStyle={styles.nameInputContainer}
          onSubmitEditing={handleContinue}
        />
      </View>

      <View style={styles.nextButtonContainer}>
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
      </View>
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  nameInputGroup: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  nameInputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  nextButtonContainer: {
    minWidth: "60%",
    marginTop: 10,
  },
  button: {},
});
