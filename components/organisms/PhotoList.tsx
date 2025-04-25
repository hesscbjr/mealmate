import { useThemeColor } from "@/hooks/useThemeColor";
import { getSavedPhotos, setPhotosInStorage } from "@/utils/storage"; // Import storage utils
import {
  FlashList,
  ListRenderItemInfo as FlashListRenderItemInfo,
} from "@shopify/flash-list";
import { useFocusEffect } from "expo-router"; // Import useFocusEffect
import React, { useCallback, useState } from "react"; // Import state/callback hooks
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PhotoItem from "../molecules/PhotoItem";

// Remove props related to data management
interface PhotoListProps {
  // photos: string[]; // Removed
  // onItemPress?: (uri: string) => void; // Removed
  // onItemDelete?: (uri: string) => void; // Removed
  // loading?: boolean; // Removed
  numColumns?: number; // Keep layout prop
}

// Calculate item size based on screen width and number of columns
const calculateItemSize = (numColumns: number, padding: number) => {
  const screenWidth = Dimensions.get("window").width;
  const totalPadding = padding * (numColumns + 1);
  const availableWidth = screenWidth - totalPadding;
  return availableWidth / numColumns;
};

const PhotoList: React.FC<PhotoListProps> = ({
  // Destructure only remaining props
  numColumns = 3,
}) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const themeTextColor = useThemeColor({}, "text");
  const themeBackgroundColor = useThemeColor({}, "background");
  const themeTintColor = useThemeColor({}, "tint");

  const listPadding = 5;
  const itemSize = calculateItemSize(numColumns, listPadding);

  // Function to load photos from storage
  const loadPhotos = useCallback(async () => {
    console.log("PhotoList focusing, loading photos..."); // Debug log
    setLoading(true);
    try {
      const savedPhotos = await getSavedPhotos();
      console.log("Loaded photos:", savedPhotos.length);
      setPhotos(savedPhotos);
    } catch (error) {
      console.error("PhotoList failed to load photos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load photos when the component/screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        console.log("PhotoList focusing, loading photos..."); // Debug log
        // Don't setLoading(true) here, do it initially or before async call
        try {
          const savedPhotos = await getSavedPhotos();
          if (isActive) {
            console.log("Loaded photos:", savedPhotos.length);
            setPhotos(savedPhotos);
            setLoading(false); // Set loading false after photos are set
          }
        } catch (error) {
          console.error("PhotoList failed to load photos:", error);
          if (isActive) {
            setLoading(false); // Also stop loading on error
          }
        }
        // Removed finally block, handle loading state within try/catch
      };

      // Set loading true before starting the async load
      setLoading(true);
      load();

      return () => {
        isActive = false; // Prevent state updates after unmount/blur
        console.log("PhotoList blurred/unmounted");
      };
    }, []) // Empty dependency array for useFocusEffect's callback
  );

  // Handle photo deletion within the component
  const handleDeletePhoto = useCallback(
    async (uriToDelete: string) => {
      console.log("Deleting photo:", uriToDelete);
      try {
        const updatedPhotos = photos.filter((uri) => uri !== uriToDelete);
        await setPhotosInStorage(updatedPhotos); // Use the new storage function
        setPhotos(updatedPhotos); // Update state immediately
        console.log("Photo deleted, remaining:", updatedPhotos.length);
      } catch (error) {
        console.error("PhotoList failed to delete photo:", error);
      }
    },
    [photos] // Depend on photos state
  );

  // Handle photo press within the component (optional)
  const handlePhotoPress = (uri: string) => {
    console.log("PhotoItem pressed:", uri);
    // TODO: Implement navigation or other action if needed later
  };

  const renderItem = ({ item }: FlashListRenderItemInfo<string>) => (
    <PhotoItem
      uri={item}
      size={itemSize}
      onPress={() => handlePhotoPress(item)} // Use internal handler
      onDelete={() => handleDeletePhoto(item)} // Use internal handler
      style={{ margin: listPadding }}
    />
  );

  // Loading State
  if (loading) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color={themeTintColor} />
      </View>
    );
  }

  // Empty State
  if (!photos || photos.length === 0) {
    return (
      <View
        style={[
          styles.centeredContainer,
          { backgroundColor: themeBackgroundColor },
        ]}
      >
        <Text style={[styles.emptyText, { color: themeTextColor }]}>
          No photos yet. Take or select one!
        </Text>
      </View>
    );
  }

  // List View
  return (
    <FlashList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item}-${index}`}
      numColumns={numColumns}
      estimatedItemSize={itemSize}
      style={[styles.list, { backgroundColor: themeBackgroundColor }]}
      contentContainerStyle={styles.listContentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContentContainer: {
    padding: 5,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default PhotoList;
