import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//  Interface detailing props and their types passed into SettingsItem component
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void; // Optional callback function that returns nothing
  textStyle?: string; // Optional prop for additional styling of the text
  showArrow?: boolean; // Optional prop to determine whether to show an arrow icon, default is true
}

// Reusable component for displaying individual settings items in the profile screen
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between py-3"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {/* If show arrow is true, render an image of the right arrow */}
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const profile = () => {
  // Using the global context to get user information and refetch from context provider
  const { user, refetch } = useGlobalContext();

  console.log(user);

  // Call logout function and alert user if they were logged out or not
  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      // Revalidate the currently logged in user, then renavigate to signin page if needed
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Display profile and notification icons */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* Display user avatar and name */}
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />

            {/* Button to edit profile */}
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        {/* Display Settings for booking and payments */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* Create a slight border for the other settings */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {/* Get the settings constant, remove the first 2 elements
          Map the rest of the elements by creating a SettingItems component for each element
          Passing the key and spreading the item (element) which will pass its properties */}
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Create a slight border for logout button */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
