import React from "react";
import FullScreenMessage from "../molecules/FullScreenMessage";
// Assuming FullScreenMessageProps is the props type for FullScreenMessage
// We might need to define or import the ButtonProps type if needed separately
// For now, let's use a simplified approach if ButtonProps isn't exported
import { ButtonProps } from "../atoms/Button"; // Assuming ButtonProps is exported from Button

// Define the possible states for permission
export type PermissionStatusType = "loading" | "denied" | "granted";

interface PermissionGateProps {
  status: PermissionStatusType;
  children: React.ReactNode;
  // Props specifically for the 'denied' state
  deniedSubtitle?: string;
  deniedButtonProps?: ButtonProps;
  deniedSecondaryButtonProps?: ButtonProps;
  // Optional custom component for loading state if default isn't sufficient
  customLoadingComponent?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  status,
  children,
  deniedSubtitle,
  deniedButtonProps,
  deniedSecondaryButtonProps,
  customLoadingComponent,
}) => {
  if (status === "loading") {
    // Use custom loading component if provided, otherwise default FullScreenMessage
    return customLoadingComponent ? (
      <>{customLoadingComponent}</>
    ) : (
      <FullScreenMessage loading fadeIn={false} />
    );
  }

  if (status === "denied") {
    // Render FullScreenMessage configured for the denied state
    return (
      <FullScreenMessage
        subtitle={deniedSubtitle}
        buttonProps={deniedButtonProps}
        secondaryButtonProps={deniedSecondaryButtonProps}
        fadeIn={false} // Consistent with previous behavior
      />
    );
  }

  // If status is 'granted'
  return <>{children}</>;
};

export default PermissionGate;
