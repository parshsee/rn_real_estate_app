import icons from "@/constants/icons";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View
} from "react-native";

const Property = () => {
  const { id } = useLocalSearchParams();

  const windowHeight = Dimensions.get("window").height;

  return (
    <View>
      // Header section with the property image and navigation icons
      <View className="relative w-full" style={{ height: windowHeight / 2 }}>
        <Image
          source={images.newYork}
          className="size-full"
          resizeMode="cover"
        />
        {/* Overlay the header with a white gradient since it is absolutely positioned */}
        <Image
          source={images.whiteGradient}
          className="absolute top-0 w-full z-40"
        />
        <View
          className="z-50 absolute inset-x-7"
          style={{ top: Platform.OS === "ios" ? 70 : 20 }}
        >
          {/* Create a view for the top navigation */}
          <View className="flex flex-row items-center w-full justify-between">
            {/* Display the back arrow button on the top left */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
            >
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>
            {/* Display the Heart and Send icons on the top right */}
            <View className="flex flex-row items-center gap-3">
              <Image
                source={icons.heart}
                className="size-7"
                tintColor={"#191D31"}
              />
              <Image source={icons.send} className="size-7" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Property;
