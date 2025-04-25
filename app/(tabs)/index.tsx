import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const handlePress = () => {
    router.push("/capture");
  };

  return (
    <View style={styles.container}>
      <Button
        title="What's In The Kitchen?"
        icon={
          <Icon
            name="search"
            size={18}
            color={Colors[colorScheme ?? "light"].text}
          />
        }
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
