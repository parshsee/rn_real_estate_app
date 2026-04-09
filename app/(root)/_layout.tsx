import { useGlobalContext } from "@/lib/global-provider";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Special layout for the properties and tabs screens (i.e all pages user has to be authenticated to see)
export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  // Set to true for testing purposes, change to checking loading
  // If loadding, show activity indicator (loading screen)
  if (true) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

}
