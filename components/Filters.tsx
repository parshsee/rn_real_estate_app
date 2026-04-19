import { categories } from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

// Resuable component to filter searchs, used in index and search pages

const Filters = () => {
  // WIll modify the local search params
  const params = useLocalSearchParams<{ filter?: string }>(); // Get back a type of filter, which is an optional string property
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All",
  );

  const handleCategoryPress = (category: string) => {
    // If user presses on already selected category, switch filter back to All
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    // Else set the selected category to what the user pressed
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {/* Get all categories from data.ts, map through each element and render a button of the category title */}
      {categories.map((category, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(category.category)}
          key={index}
          // Selected category will have different background and borders than other ones
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === category.category
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${selectedCategory === category.category ? "text-white font-rubik-bold mt-0.5" : "text-black-300 font-rubik"}`}
          >
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
