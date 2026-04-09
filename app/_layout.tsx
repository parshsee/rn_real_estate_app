import { SplashScreen, Stack } from "expo-router";

import GlobalProvider from "@/lib/global-provider";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout() {
  // Load custom fonts from the assets/fonts directory added in the app.json file
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // If fonts have loaded, hide the splash screen and continute to the app
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Render the app's navigation stack with the header hidden for all screens
  return (
    // Wrap the entire app with the GlobalProvider to provide global state (like user authentication status) to all screens and components in the app
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
