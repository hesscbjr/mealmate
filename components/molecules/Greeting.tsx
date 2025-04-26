import Text from "@/components/atoms/Text";
import { useUserStore } from "@/store/user";
import React from "react";
import { StyleSheet } from "react-native";

const DEFAULT_GREETING_NAME = "buddy";

type GreetingProps = {};

const Greeting = ({}: GreetingProps) => {
  const firstName = useUserStore((state) => state.firstName);

  return (
    <Text style={styles.greetingText}>
      {`What's in the pantry today, ${firstName || DEFAULT_GREETING_NAME}?`}
    </Text>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 30,
  },
});
