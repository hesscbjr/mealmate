import Button from "@/components/atoms/Button";
import IconButton from "@/components/molecules/IconButton";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CaptureScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  if (!cameraPermission || !mediaPermission) {
    // Permissions are still loading
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={[styles.permissionContainer, { paddingTop: insets.top }]}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera.
        </Text>
        <Button
          onPress={requestCameraPermission}
          title="Grant Camera Access"
          variant="primary"
        />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    // Media library permissions are not granted yet
    return (
      <View style={[styles.permissionContainer, { paddingTop: insets.top }]}>
        <Text style={styles.permissionText}>
          We need your permission to access photos.
        </Text>
        <Button
          onPress={requestMediaPermission}
          title="Grant Photo Library Access"
          variant="primary"
        />
      </View>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7, // Adjust quality as needed
          // base64: true, // Include if you need base64 data later
        });
        if (photo) {
          console.log("Photo taken:", photo.uri);
          // await savePhoto(photo.uri); // Save photo first if needed, or maybe after preview?
          router.push({
            pathname: "/preview",
            params: { imageUri: photo.uri },
          });
          // router.back(); // Example: go back after taking photo
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  }

  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false, // Disable editing
        quality: 0.7, // Adjust quality as needed
        // base64: true, // Include if you need base64 data later
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log("Image picked:", imageUri);
        // await savePhoto(imageUri); // Save photo first if needed, or maybe after preview?
        router.push({ pathname: "/preview", params: { imageUri: imageUri } });
        // router.back(); // Example: go back after picking image
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  }

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
            size={30}
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
            size={30}
            color="white"
            iconSet="fa5"
          />
        </View>
      </CameraView>

      <IconButton
        style={[
          styles.backButton,
          { top: Platform.OS === "ios" ? insets.top + 10 : insets.top + 20 },
        ]}
        onPress={handleGoBack}
        name="arrow-left"
        size={24}
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
    padding: 20,
    backgroundColor: "white",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
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
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  iconButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "grey",
  },
  backButton: {
    position: "absolute",
    left: 15,
    padding: 10,
  },
});
