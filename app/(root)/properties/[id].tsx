import icons from "@/constants/icons";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Property = () => {
  const { id } = useLocalSearchParams();

  const windowHeight = Dimensions.get("window").height;

  return (
    <View>
      {/* Header section with the property image and navigation icons */}
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
      {/* Property Info and Agent Info */}
      <View className="px-5 mt-7 flex gap-2">
        {/* Property title */}
        <Text className="text-2xl font-rubik-extrabold">Modern Apartment</Text>

        {/* Property type and rating */}
        <View className="flex flex-row items-center gap-3">
          <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
            <Text className="text-xs font-rubik-bold text-primary-300">
              Condo
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Image source={icons.star} className="size-5" />
            <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
              4.5 (5000 reviews)
            </Text>
          </View>
        </View>

        {/* Property amenities */}
        <View className="flex flex-row items-center mt-5">
          {/* Display bed icon and number of beds */}
          <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
            <Image source={icons.bed} className="size-4" />
          </View>
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            5 Beds
          </Text>

          {/* Display bath icon and number of baths */}
          <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
            <Image source={icons.bath} className="size-4" />
          </View>
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            5 Baths
          </Text>

          {/* Display area icon and sqft */}
          <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
            <Image source={icons.area} className="size-4" />
          </View>
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            1500 sqft
          </Text>
        </View>

        {/* Display agent information */}
        <View className="w-full border-t border-primary-200 pt-7 mt-5">
          <Text className="text-black-300 text-xl font-rubik-bold">Agent</Text>
        </View>

        {/* Display agent information in a row */}
        <View className="flex flex-row items-center justify-between mt-4">
          {/* Show agent avatar, name, and email on left side*/}
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-14 rounded-full" />

            <View className="flex flex-col items-start justify-center ml-3">
              <Text className="text-lg text-black-300 text-start font-rubik-bold">
                Agent Name
              </Text>
              <Text className="text-sm text-black-300 text-start font-rubik-medium">
                agent@gmail.com
              </Text>
            </View>
          </View>

          {/* Show message and phone icons on right side */}
          <View className="flex flex-row items-center gap-3">
            <Image source={icons.chat} className="size-7" />
            <Image source={icons.phone} className="size-7" />
          </View>
        </View>

        {/* Display property overview */}
      </View>
    </View>
  );
};

export default Property;
