import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { PermissionStatus } from "expo-modules-core";
import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";

interface UseCapturePermissionsReturn {
  loading: boolean;
  granted: boolean;
  denied: boolean;
  requestAllPermissions: () => Promise<void>;
  openSettings: () => void;
}

/**
 * Custom hook to manage camera and media library permissions for capturing images.
 *
 * @returns {UseCapturePermissionsReturn} An object containing permission status and control functions.
 *  - `loading`: True while permissions are being checked or requested.
 *  - `granted`: True if both camera and media library permissions are granted.
 *  - `denied`: True if either permission has been denied (and cannot be asked again) or is permanently restricted.
 *  - `requestAllPermissions`: Function to manually trigger requests for both permissions.
 *  - `openSettings`: Function to open the app's settings screen.
 */
export function useCapturePermissions(): UseCapturePermissionsReturn {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const [loading, setLoading] = useState(true);
  const [granted, setGranted] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      // If initial status is undetermined for either, request them
      if (
        cameraPermission?.status === PermissionStatus.UNDETERMINED ||
        mediaPermission?.status === PermissionStatus.UNDETERMINED
      ) {
        setLoading(true); // Ensure loading state is true during requests
        // Request in parallel (Expo hooks handle the actual OS calls)
        await Promise.all([
          cameraPermission?.status === PermissionStatus.UNDETERMINED && requestCameraPermission(),
          mediaPermission?.status === PermissionStatus.UNDETERMINED && requestMediaPermission(),
        ]);
        // After requests, the hooks will update, triggering another effect run
        return; // Exit early, wait for status update
      }


      // Determine combined status once both are determined
      const cameraGranted = cameraPermission?.granted ?? false;
      const mediaGranted = mediaPermission?.granted ?? false;
      const cameraDenied = cameraPermission?.status === PermissionStatus.DENIED && !cameraPermission?.canAskAgain;
      const mediaDenied = mediaPermission?.status === PermissionStatus.DENIED && !mediaPermission?.canAskAgain;
       const cameraRestricted = cameraPermission?.status === PermissionStatus.DENIED && cameraPermission?.canAskAgain === false; // Consider restricted as denied
       const mediaRestricted = mediaPermission?.status === PermissionStatus.DENIED && mediaPermission?.canAskAgain === false; // Consider restricted as denied


      if (cameraGranted && mediaGranted) {
        setGranted(true);
        setDenied(false);
      } else if (cameraDenied || mediaDenied || cameraRestricted || mediaRestricted) {
        setGranted(false);
        setDenied(true);
      } else {
        // Handles cases like granted but askable again, or still undetermined somehow
        setGranted(false);
        setDenied(false); // Not fully granted, but not permanently denied either
      }

      // Update loading state only after status is determined
      if (cameraPermission?.status && mediaPermission?.status) {
          setLoading(false);
      }
    };

    checkPermissions();
    // Depend on the status objects to re-run when permissions change
  }, [cameraPermission, mediaPermission, requestCameraPermission, requestMediaPermission]);

  const requestAllPermissions = useCallback(async () => {
    setLoading(true);
    await Promise.all([requestCameraPermission(), requestMediaPermission()]);
    // Status will update via useEffect
  }, [requestCameraPermission, requestMediaPermission]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  return { loading, granted, denied, requestAllPermissions, openSettings };
} 