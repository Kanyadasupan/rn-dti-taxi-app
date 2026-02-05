import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Prompt_400Regular,
  Prompt_700Bold,
  Prompt_600SemiBold,
} from "@expo-google-fonts/prompt";
import { useEffect } from "react";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_600SemiBold,
    Prompt_700Bold,
  });
  
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
