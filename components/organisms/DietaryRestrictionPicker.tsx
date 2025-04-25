import Text from "@/components/atoms/Text";
import { useUserStore } from "@/store/user";
import React from "react";
import { StyleSheet, View } from "react-native";
import DietaryOption from "../molecules/DietaryOption";

// Define the list of available dietary restrictions
const AVAILABLE_RESTRICTIONS: string[] = [
  "Vegan",
  "Vegetarian",
  "Gluten Free",
  "Dairy Free",
  "Nut Free",
  "Pescatarian",
  "Keto",
  "Paleo",
];

const DietaryRestrictionPicker: React.FC = () => {
  const currentRestrictions = useUserStore(
    (state) => state.dietaryRestrictions
  );
  const setRestrictions = useUserStore((state) => state.setDietary);

  const handleToggleRestriction = (restriction: string) => {
    const isSelected = currentRestrictions.includes(restriction);
    let updatedRestrictions;
    if (isSelected) {
      // Remove the restriction
      updatedRestrictions = currentRestrictions.filter(
        (r) => r !== restriction
      );
    } else {
      // Add the restriction
      updatedRestrictions = [...currentRestrictions, restriction];
    }
    setRestrictions(updatedRestrictions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Preferences</Text>
      <View style={styles.optionsContainer}>
        {AVAILABLE_RESTRICTIONS.map((restriction) => (
          <DietaryOption
            key={restriction}
            label={restriction}
            selected={currentRestrictions.includes(restriction)}
            onPress={() => handleToggleRestriction(restriction)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center the pills horizontally
    gap: 8, // Use gap for spacing if targeting newer RN versions, otherwise use margin in DietaryOption
  },
});

export default DietaryRestrictionPicker;
