import Text from "@/components/atoms/Text";
import React from "react";
import { StyleSheet, TextStyle } from "react-native";

const DEFAULT_GREETING_NAME = "buddy";

interface GreetingProps {
  name?: string | null;
  style?: TextStyle; // Allow passing custom styles
}

// Define styles within the component file
const styles = StyleSheet.create({
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 30,
  },
});

const Greeting: React.FC<GreetingProps> = ({ name, style }) => {
  return (
    <Text style={[styles.greetingText, style]}>
      {`What's in the pantry today, ${name || DEFAULT_GREETING_NAME}?`}
    </Text>
  );
};

export default Greeting;
