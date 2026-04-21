import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ScrollView & FlatList Notes
FlatList is preferred over ScrollView for lists of items, where you have dynamic data
It only loads the elements currently on the screen, making it more memory efficent
You can't have two Flatlist or ScrollViews in different directions on the same screen
- No two virtualized lists can be added in different directions
*/

export default function Index() {
  const { user } = useGlobalContext();
  // Get the query (optional) and filter (optional) from the search params
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Call the Appwrite DB using useAppwrite, passing in the getLatestProperties function
  // Returns data renamed to latestProperties and loading renamed to latestPropertiesLoading
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  // Call the Appwrite DB using useAppwrite, passing in the getProperties function and passing parameters for the function
  // Params: filter and query, gotten from useLocalSearchParams, limit
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  // Function whenever property card is pressed to route to the property detail page
  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  // Whenever the filter or query changes, recall the getProperties fucntion using useEffect
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]); // Called whenever params.filter OR params.query changes

  return (
    <SafeAreaView className="bg-white h-full">
      {/* This button allows you to seed the DB if dummy data is needed. Will delete all info in DB before seeding! */}
      {/* <Button title="Seed" onPress={seed} /> */}

      {/* Flatlist creates a list of items, using 
              data: object to pull from
              renderItem: how each item from the data is displayed
              keyExtractor: function to extract a unique key for each item, helps react re-render
              ListHeaderComponent: The header of the FlatList, what shows before/above the renderItem
              numColumns: number of columns in the grid
              columnWrapperStyle: style for the wrapper of each column
              columnWrapperClassName: used to style each column instead of columnWrapperStyle. For when you want to use Tailwind to style
              className: additional class names for the FlatList container
              contentContainerClassName: same as classname
              showVerticalScrollIndicator: show or hide the scrollbar
              scrollEnabled: whether scrolling is enabled ------ THIS IS SET TO FALSE SO THE FLATLIST DOESN'T SCROLL INDEPENDENTLY, INSTEAD THE SCROLLVIEW SCROLLS THE ENTIRE CONTENT INCLUDING THE FLATLIST
      */}
      {/* Essentially, 
            We are showing everything from the Good Morning header to the Filters under Our Recommendations in the ListHeaderComponent
            Then we are showing the Cards for Our Recommendations in the renderItem afterwards
            The FeaturedCards are another FlatList inside this, that is set to scroll horizontally 
      */}
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          // For each item, render a Card, passing the item as prop (for its info) and onPress to route
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            {/* Header */}
            <View className="flex flex-row items-center justify-between mt-5">
              {/* View for the header */}
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            {/* Search bar */}
            <Search />
            {/* Featured Section */}
            <View className="my-5">
              {/* Header */}
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* FlatList showing the FeaturedCards in a horizontal scroll
                Doesn't trigger any warnings because it is rendered inside another FlatList instead of outside. See above note on having different directions
                horizontal: Tells the list to scroll horizontally
                showHorizontalScrollIndicator: Whether to show horizontal scrollbar or not
                bounces: Whether you can drag the scroll items up and down (or left and right depending on direction) or not
              */}
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  // For each item, render a FeaturedCard, passing the item as prop (for its info) and onPress to route
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            {/* Regular Card Section */}
            <View className="mt-5">
              {/* Header */}
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendations
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
