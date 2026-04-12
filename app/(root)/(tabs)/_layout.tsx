import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

import icons from "@/constants/icons";

// Custom component for displaying tab icons with text in the bottom tab navigator
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  // Display the icon and title for each tab, changing the color and font weight based on whether the tab is focused (active) or not
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061ff" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-clip mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hides the default tab labels to create a cleaner look, as we are using custom icons with text instead
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      {/* Define the screens for each tab (what the look like, and point to) */}
      <Tabs.Screen
        name="index" // Name of the screen, corresponds to the file name of the screen component (index.tsx in this case)
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      {/* Define the screens for each tab (what the look like, and point to) */}
      <Tabs.Screen
        name="explore" // Name of the screen, corresponds to the file name of the screen component (index.tsx in this case)
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title="Explore" />
          ),
        }}
      />
      {/* Define the screens for each tab (what the look like, and point to) */}
      <Tabs.Screen
        name="profile" // Name of the screen, corresponds to the file name of the screen component (index.tsx in this case)
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
