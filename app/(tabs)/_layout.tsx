import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import Icon from "@/components/atoms/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserStore } from "@/store/user";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const onboardingCompleted = useUserStore(
    (state) => state.completedOnboarding
  );

  if (!onboardingCompleted) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <Icon name="telegram-plane" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
