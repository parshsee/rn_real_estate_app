import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void; // Optional function that returns nothing
}

// Component for the featured cards
export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      {/* Japan image */}
      <Image source={images.japan} className="size-full rounded-2xl" />
      {/* Have a gradient over the image */}
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      {/* Show rating on the top right of the image */}
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5 ">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.4
        </Text>
      </View>

      {/* Render elements in a column from the bottom up, on top of the image */}
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        {/* Show the name of the card and address */}
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text className="text-base font-rubik text-white">
          22 W 15th St, New York, NY 10011
        </Text>

        {/* Render elements in a row */}
        <View className="flex flex-row items-center justify-between w-full">
          {/* Show  the price and a heart icon for saving*/}
          <Text className="text-xl font-rubik-extrabold text-white">
            $2,500
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Component for the regular cards
export const Card = ({ onPress }: Props) => {
  // TODO: Fix error  ERROR  Text strings must be rendered within a <Text> component. Says line 72?

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      {/* Show rating on the top right of the image */}
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          4.4
        </Text>
      </View>
      {/* New York image */}
      <Image source={images.newYork} className="w-full h-40 rounded-lg" />
      {/* Render elements in a column from the bottom up, on top of the image */}
      <View className="flex flex-col mt-2">
        {/* Show the name of the card and address */}
        <Text className="text-base font-rubik-bold text-black-300">
          Cozy Studio
        </Text>
        <Text className="text-xs font-rubik text-black-200">
          22 W 15th St, New York, NY 10011
        </Text>

        {/* Render elements in a row */}
        <View className="flex flex-row items-center justify-between mt-2">
          {/* Show  the price and a heart icon for saving*/}
          <Text className="text-base font-rubik-bold text-primary-300">
            $2,500
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>{" "}
    </TouchableOpacity>
  );
};
