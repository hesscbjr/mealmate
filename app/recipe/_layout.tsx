// recipe/_layout.tsx
import { Stack } from "expo-router";

export default function RecipeStack() {
  return (
    <Stack
      screenOptions={{ headerShown: true }} // keep control in [id].tsx
    />
  );
}
