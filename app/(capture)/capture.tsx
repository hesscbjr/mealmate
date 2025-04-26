import CaptureButton from "@/components/atoms/CaptureButton";
import IconButton from "@/components/molecules/IconButton";
import PermissionGate, {
  PermissionStatusType,
} from "@/components/organisms/PermissionGate";
import { useCapturePermissions } from "@/hooks/useCapturePermissions";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const IMAGE_QUALITY = 0.7;
const ICON_BUTTON_PADDING = 10;
const ICON_SIZE_MEDIUM = 30;
const ICON_SIZE_SMALL = 24;
const CONTAINER_PADDING = 20;
const TOP_PADDING_IOS = 10;
const TOP_PADDING_ANDROID = 20;
const BOTTOM_PADDING_TOP = 15;
const PERMISSION_TEXT_SIZE = 16;
const BACK_BUTTON_LEFT = 15;

export default function CaptureScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();
  const { loading, denied, openSettings } = useCapturePermissions();

  const themeCaptureBackgroundColor = useThemeColor({}, "captureBackground");
  const styles = getDynamicStyles(themeCaptureBackgroundColor);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

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

  const backButtonTopOffset =
    insets.top +
    (Platform.OS === "ios" ? TOP_PADDING_IOS : TOP_PADDING_ANDROID);

  const permissionStatus: PermissionStatusType = loading
    ? "loading"
    : denied
    ? "denied"
    : "granted";

  return (
    <PermissionGate
      status={permissionStatus}
      deniedSubtitle="Camera and Media Library permissions are required to capture and select photos. Please grant permissions in your phone settings."
      deniedButtonProps={{
        title: "Open Settings",
        onPress: openSettings,
        variant: "primary",
      }}
      deniedSecondaryButtonProps={{
        title: "Go Back",
        onPress: handleGoBack,
        variant: "secondary",
      }}
    >
      {/* Granted state: Render the camera UI */}
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View
            style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}
          >
            <IconButton
              style={styles.iconButton}
              onPress={pickImage}
              name="images"
              size={ICON_SIZE_MEDIUM}
              color="white"
              iconSet="fa5"
            />
            <CaptureButton onPress={takePicture} />
            <IconButton
              style={styles.iconButton}
              onPress={toggleCameraFacing}
              name="sync-alt"
              size={ICON_SIZE_MEDIUM}
              color="white"
              iconSet="fa5"
            />
          </View>
        </CameraView>

        <IconButton
          style={[
            styles.backButton,
            {
              top: backButtonTopOffset,
            },
          ]}
          onPress={handleGoBack}
          name="arrow-left"
          size={ICON_SIZE_SMALL}
          color="white"
          iconSet="fa5"
          activeOpacity={0.7}
        />
      </View>
    </PermissionGate>
  );
}

const getDynamicStyles = (captureBackgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: captureBackgroundColor,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: CONTAINER_PADDING,
      backgroundColor: "white",
    },
    permissionText: {
      textAlign: "center",
      marginBottom: CONTAINER_PADDING,
      fontSize: PERMISSION_TEXT_SIZE,
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
      paddingHorizontal: CONTAINER_PADDING,
      paddingTop: BOTTOM_PADDING_TOP,
    },
    iconButton: {
      padding: ICON_BUTTON_PADDING,
    },
    backButton: {
      position: "absolute",
      left: BACK_BUTTON_LEFT,
      padding: ICON_BUTTON_PADDING,
    },
  });
