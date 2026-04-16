import React from "react";
import { Text, View } from "react-native";

interface Props {
  onPress?: () => void; // Optional function that returns nothing
}

// Component for the featured cards
export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <View>
      export <Text>FeaturedCard</Text>
    </View>
  );
};

// Component for the regular cards
export const Card = () => {
  return (
    <View>
      export <Text>Card</Text>
    </View>
  );
};
