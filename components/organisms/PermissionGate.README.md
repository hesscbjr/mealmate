# PermissionGate Component

## Purpose

The `PermissionGate` component acts as a wrapper to handle the common UI flow for requesting and managing permissions (e.g., Camera, Location, Media Library) based on a status string.

It simplifies components that require permissions by abstracting the rendering of standard loading and denied states, allowing the wrapped component to focus solely on the granted state.

## Props

- `status` (PermissionStatusType: `'loading' | 'denied' | 'granted'`): The current status of the permission check.
- `children` (React.ReactNode): The UI to render when the `status` is `'granted'`.
- `deniedSubtitle` (string, optional): The subtitle text to display on the `FullScreenMessage` when `status` is `'denied'`.
- `deniedButtonProps` (ButtonProps, optional): Props to pass to the primary button on the `FullScreenMessage` when `status` is `'denied'`. Typically used for an "Open Settings" action.
- `deniedSecondaryButtonProps` (ButtonProps, optional): Props to pass to the secondary button on the `FullScreenMessage` when `status` is `'denied'`. Typically used for a "Go Back" or dismiss action.
- `customLoadingComponent` (React.ReactNode, optional): A custom component to render when `status` is `'loading'`. If not provided, a default `<FullScreenMessage loading />` is rendered.

## Usage Example

```tsx
import React from "react";
import PermissionGate, { PermissionStatusType } from "./PermissionGate";
import useSomePermission from "../hooks/useSomePermission"; // Your custom permission hook
import FeatureComponent from "./FeatureComponent"; // The component that needs permissions
import { router } from "expo-router";

const MyFeatureScreen = () => {
  const { loading, denied, openSettings } = useSomePermission();

  const handleGoBack = () => router.back();

  // Determine the status
  const status: PermissionStatusType = loading
    ? "loading"
    : denied
    ? "denied"
    : "granted";

  return (
    <PermissionGate
      status={status}
      deniedSubtitle="This feature requires permission. Please grant it in settings."
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
      {/* This will only render if status is 'granted' */}
      <FeatureComponent />
    </PermissionGate>
  );
};

export default MyFeatureScreen;
```
