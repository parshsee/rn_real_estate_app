import { Card } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// NOTE: This page is very similar to homepage, so some code and comments are copied from there

export default function Explore() {
  // Get the query (optional) and filter (optional) from the search params
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

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
              ListEmptyComponent: What shows if the array of objects passed in data above is empty
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
        ListEmptyComponent={
          // When the data array is empty this is called
          // If loading is true, display activity indicator
          // Otherwise no the No Results component
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <Search />
          </View>
        }
      />
    </SafeAreaView>
  );
}
