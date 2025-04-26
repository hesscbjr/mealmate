import Button from "@/components/atoms/Button";
import IconButton from "@/components/molecules/IconButton";
import { useCapturePermissions } from "@/hooks/useCapturePermissions";
import { CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- Constants ---
const IMAGE_QUALITY = 0.7;
const CAPTURE_BUTTON_SIZE = 70;
const CAPTURE_BUTTON_BORDER_WIDTH = 4;
const ICON_BUTTON_PADDING = 10;
const ICON_SIZE_MEDIUM = 30;
const ICON_SIZE_SMALL = 24;
const CONTAINER_PADDING = 20;
const TOP_PADDING_IOS = 10;
const TOP_PADDING_ANDROID = 20;
const BOTTOM_PADDING_TOP = 15;
const PERMISSION_TEXT_SIZE = 16;
const SETTINGS_BUTTON_MARGIN_BOTTOM = 10;
const BACK_BUTTON_LEFT = 15;
// ---

export default function CaptureScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();
  const { loading, granted, denied, requestAllPermissions, openSettings } =
    useCapturePermissions();

  // Define handleGoBack early
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  // Define main camera actions (must be defined before conditional returns)
  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }, [setFacing]);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: IMAGE_QUALITY,
        });
        if (photo) {
          router.push({
            pathname: "/preview",
            params: { imageUri: photo.uri },
          });
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  }, [cameraRef, router]);

  const pickImage = useCallback(async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        quality: IMAGE_QUALITY,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        router.push({ pathname: "/preview", params: { imageUri: imageUri } });
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  }, [router]);

  // Calculate back button top offset
  const backButtonTopOffset =
    insets.top +
    (Platform.OS === "ios" ? TOP_PADDING_IOS : TOP_PADDING_ANDROID);

  if (loading) {
    // Use existing permission container style for loading
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (denied) {
    // Use existing permission container and text, but use hook functions
    return (
      <View style={[styles.permissionContainer, { paddingTop: insets.top }]}>
        <Text style={styles.permissionText}>
          Camera and Media Library permissions are required to capture and
          select photos. Please grant permissions in your phone settings.
        </Text>
        {/* Use openSettings from the hook */}
        <Button
          onPress={openSettings} // Use hook's function
          title="Open Settings"
          style={styles.settingsButton}
          variant="primary"
        />
        <Button onPress={handleGoBack} title="Go Back" variant="secondary" />
      </View>
    );
  }

  // If we reach here, permissions are granted (granted === true)
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View
          style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}
        >
          <IconButton
            style={styles.iconButton}
            onPress={pickImage}
            name="images"
            size={ICON_SIZE_MEDIUM} // Use constant
            color="white"
            iconSet="fa5"
          />
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            {/* Simple circle for capture button */}
          </TouchableOpacity>
          <IconButton
            style={styles.iconButton}
            onPress={toggleCameraFacing}
            name="sync-alt"
            size={ICON_SIZE_MEDIUM} // Use constant
            color="white"
            iconSet="fa5"
          />
        </View>
      </CameraView>

      <IconButton
        style={[
          styles.backButton,
          {
            top: backButtonTopOffset, // Use the calculated constant
          }, // Use constants
        ]}
        onPress={handleGoBack}
        name="arrow-left"
        size={ICON_SIZE_SMALL} // Use constant
        color="white"
        iconSet="fa5"
        activeOpacity={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: CONTAINER_PADDING, // Use constant
    backgroundColor: "white",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: CONTAINER_PADDING, // Use constant
    fontSize: PERMISSION_TEXT_SIZE, // Use constant
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: CONTAINER_PADDING, // Use constant
    paddingTop: BOTTOM_PADDING_TOP, // Use constant
  },
  iconButton: {
    padding: ICON_BUTTON_PADDING, // Use constant
  },
  captureButton: {
    width: CAPTURE_BUTTON_SIZE, // Use constant
    height: CAPTURE_BUTTON_SIZE, // Use constant
    borderRadius: CAPTURE_BUTTON_SIZE / 2, // Use constant
    backgroundColor: "white",
    borderWidth: CAPTURE_BUTTON_BORDER_WIDTH, // Use constant
    borderColor: "grey",
  },
  backButton: {
    position: "absolute",
    left: BACK_BUTTON_LEFT, // Use constant
    padding: ICON_BUTTON_PADDING, // Use constant
  },
  settingsButton: {
    marginBottom: SETTINGS_BUTTON_MARGIN_BOTTOM, // Use constant
  },
});
