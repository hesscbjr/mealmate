import { Stack } from "expo-router";

export default function CaptureLayout() {
  return (
    <Stack>
      <Stack.Screen name="capture" options={{ headerShown: false }} />
      <Stack.Screen name="preview" options={{ headerShown: true }} />
    </Stack>
  );
}
