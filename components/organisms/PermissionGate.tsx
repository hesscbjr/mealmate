import React from "react";
import { ButtonProps } from "../atoms/Button";
import FullScreenMessage from "../molecules/FullScreenMessage";

export type PermissionStatusType = "loading" | "denied" | "granted";

type PermissionGateProps = {
  status: PermissionStatusType;
  children: React.ReactNode;
  deniedSubtitle?: string;
  deniedButtonProps?: ButtonProps;
  deniedSecondaryButtonProps?: ButtonProps;
  customLoadingComponent?: React.ReactNode;
};

const PermissionGate = ({
  status,
  children,
  deniedSubtitle,
  deniedButtonProps,
  deniedSecondaryButtonProps,
  customLoadingComponent,
}: PermissionGateProps) => {
  if (status === "loading") {
    return customLoadingComponent ? (
      <>{customLoadingComponent}</>
    ) : (
      <FullScreenMessage loading fadeIn={false} />
    );
  }

  if (status === "denied") {
    return (
      <FullScreenMessage
        subtitle={deniedSubtitle}
        buttonProps={deniedButtonProps}
        secondaryButtonProps={deniedSecondaryButtonProps}
        fadeIn={false}
      />
    );
  }

  // If status is 'granted', render the children
  return <>{children}</>;
};

export default PermissionGate;
