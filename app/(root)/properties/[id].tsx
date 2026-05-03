import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Property = () => {
  // Get specifically the id parameter from the URL using useLocalSearchParams hook
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  // console.log(property);
  // console.log(property?.reviews);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        {/* Header section with the property image and navigation icons */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
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
          <Text className="text-2xl font-rubik-extrabold">
            {property?.name}
          </Text>

          {/* Property type and rating */}
          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                {property?.rating} ({property?.reviews?.length} reviews)
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
              {property?.bedrooms} Beds
            </Text>

            {/* Display bath icon and number of baths */}
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.bathrooms} Baths
            </Text>

            {/* Display area icon and sqft */}
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.area} sqft
            </Text>
          </View>

          {/* Display agent information */}
          <View className="w-full border-t border-primary-200 pt-7 mt-5">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Agent
            </Text>
          </View>

          {/* Display agent information in a row */}
          <View className="flex flex-row items-center justify-between mt-4">
            {/* Show agent avatar, name, and email on left side*/}
            <View className="flex flex-row items-center">
              <Image
                source={{ uri: property?.agent?.avatar }}
                className="size-14 rounded-full"
              />

              <View className="flex flex-col items-start justify-center ml-3">
                <Text className="text-lg text-black-300 text-start font-rubik-bold">
                  {property?.agent?.name}
                </Text>
                <Text className="text-sm text-black-300 text-start font-rubik-medium">
                  {property?.agent?.email}
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
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Overview
            </Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {property?.description}
            </Text>
          </View>

          {/* Display property facilities */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {/* Loop through the property.facilities array and display the
                  facility icon and title for each facility. We use the facilities
                  constant to get the icon for each facility based on its title. */}
                {property?.facilities.map((item: string, index: number) => {
                  // Since the facility titles in the property.facilities array are formatted differently than the facilities in the constants file, we need to format them to match.
                  // The enum in Appwrite uses hyphens, but the constants file uses spaces so we replace hyphens with spaces.
                  // The constant file also has "Swimming Pool" as a facility, but the enum in Appwrite formats it as "Swimming-Pool", so we need to change that as well.
                  item = item.split("-").join(" ");
                  if (item === "Swimming Pool") item = "Swimming pool";

                  // Get facility constant where its title matches the facility item from property.facilities array
                  const facility = facilities.find(
                    (facility) => facility.title === item,
                  );

                  return (
                    <View
                      key={index}
                      className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                    >
                      <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Display prpoerty gallery */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Gallery
            </Text>
          </View>

          {/* Loop through the property.gallery array and display each image */}
          {property?.gallery.length > 0 && (
            <FlatList
              data={property?.gallery}
              keyExtractor={(item) => item.$id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.image }}
                  className="size-40 rounded-xl"
                />
              )}
              contentContainerClassName="flex gap-4 mt-3"
              contentContainerStyle={{ paddingRight: 20 }}
            />
          )}

          {/* Display location */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            {/* Location icon and address */}
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.address}
              </Text>
            </View>
            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Property;
