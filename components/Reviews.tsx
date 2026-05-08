import icons from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.DefaultRow; // Assuming this is the type for a review item, adjust as necessary
}

// Component to display a single review
const Reviews = ({ item }: Props) => {
  return (
    <View className="flex flex-col items-start">
      {/* Display the reviewer's avatar and name */}
      <View className="flex flex-row items-center">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="text-base text-black-300 text-start font-rubik-bold ml-3">
          {item.name}
        </Text>
      </View>

      {/* Display the review content */}
      <Text className="text-black-200 text-base font-rubik mt-2">
        {item.review}
      </Text>

      {/* Display likes and creation date */}
      <View className="flex flex-row items-center w-full justify-between mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            120
          </Text>
        </View>
        <Text className="text-black-100 text-sm font-rubik">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Reviews;
