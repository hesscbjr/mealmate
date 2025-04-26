import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import Icon from "@/components/atoms/Icon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUserStore } from "@/store/user";

export default function TabLayout() {
  const tintColor = useThemeColor({}, "tint");
  const onboardingCompleted = useUserStore(
    (state) => state.completedOnboarding
  );

  if (!onboardingCompleted) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
