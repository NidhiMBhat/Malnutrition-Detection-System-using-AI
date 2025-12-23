import "../src/i18n";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Health Worker Login" }} />
      <Stack.Screen name="details" options={{ title: "Patient Details" }} />
      <Stack.Screen name="result" options={{ title: "Result" }} />
    </Stack>
  );
}
