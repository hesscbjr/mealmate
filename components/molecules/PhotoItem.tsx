import { useThemeColor } from "@/hooks/useThemeColor"; // Import useThemeColor
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Icon from "../atoms/Icon";
import PhotoThumbnail from "../atoms/PhotoThumbnail";

interface PhotoItemProps {
  uri: string;
  onPress?: () => void;
  onDelete?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>; // Style for the container
}

const PhotoItem: React.FC<PhotoItemProps> = ({
  uri,
  onPress,
  onDelete,
  size = 80,
  style,
}) => {
  const themeBorderColor = useThemeColor({}, "icon"); // Use icon color for border for now
  const themeIconColor = useThemeColor({}, "icon"); // Get icon color from theme
  const deleteButtonBackgroundColor = useThemeColor({}, "background"); // For delete button background

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { borderColor: themeBorderColor }, style]}
      disabled={!onPress} // Disable touch feedback if no onPress provided
      activeOpacity={onPress ? 0.7 : 1.0}
    >
      <PhotoThumbnail uri={uri} size={size} />

      {onDelete && (
        <TouchableOpacity
          style={[
            styles.deleteButton,
            { backgroundColor: deleteButtonBackgroundColor },
          ]}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Increase tap area
        >
          <Icon name="times" size={size * 0.2} color={themeIconColor} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative", // Needed for positioning the delete button
    margin: 5, // Add some margin around items
    borderWidth: 1, // Add a border
    borderRadius: 9, // Match thumbnail radius + border
    overflow: "hidden", // Clip the delete button corner if needed
  },
  deleteButton: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 4,
    borderRadius: 10, // Make it round
    opacity: 0.8,
  },
});

export default PhotoItem;
