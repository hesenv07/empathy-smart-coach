import { Stack } from 'expo-router';
import { AppProvider } from '../src/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="card-linking" />
        <Stack.Screen name="monthly-plan" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProvider>
  );
}
