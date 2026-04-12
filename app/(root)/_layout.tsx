import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Special layout for the properties and tabs screens (i.e all pages user has to be authenticated to see)
export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  // Set to true for testing purposes, change to checking loading
  // If loadding, show activity indicator (loading screen)
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  // If not logged in, redirect to the sign in page
  if (!isLoggedIn) {
    {
      return <Redirect href="/sign-in" />;
    }
  }

  // If logged in, show the app's main content (the nested screens will be rendered inside the <Slot /> component)
  return <Slot />;
}
