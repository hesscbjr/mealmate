import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";

interface PhotoThumbnailProps {
  uri: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  uri,
  size = 80,
  style,
}) => {
  return (
    <Image
      source={{ uri }}
      style={[styles.image, { width: size, height: size }, style]}
      resizeMode="cover" // Ensure image covers the area without distortion
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8, // Slightly rounded corners
    backgroundColor: "#ccc", // Placeholder background while loading
  },
});

export default PhotoThumbnail;
