import Text from "@/components/atoms/Text"; // Assuming Text atom exists
import React from "react";
import {
  Dimensions,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type StarredEmptyStateStyles = {
  emptyStateContainer: ViewStyle;
  emptyListText: TextStyle;
  emptyListImage: ImageStyle;
};

// Get screen width
const screenWidth = Dimensions.get("window").width;
// Calculate image size (e.g., 40% of screen width)
const imageSize = screenWidth * 0.4;

const styles = StyleSheet.create<StarredEmptyStateStyles>({
  emptyStateContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 40,
  },
  emptyListImage: {
    width: imageSize, // Use calculated size
    height: imageSize, // Use calculated size
    marginTop: 15,
  },
});

const StarredEmptyState: React.FC = () => {
  return (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyListText}>
        No starred recipes yet. Hit 'What's in the kitchen' to get started!
      </Text>
      <Image
        source={require("@/assets/images/sad.png")} // Ensure this path is correct relative to the new component location
        style={styles.emptyListImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default StarredEmptyState;
