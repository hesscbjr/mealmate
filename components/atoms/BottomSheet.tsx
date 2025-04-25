import RNBottomSheet, {
  BottomSheetView,
  BottomSheetProps as RNBottomSheetProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";

// Exclude 'children' from RNBottomSheetProps as we handle it explicitly
export interface BottomSheetProps extends Omit<RNBottomSheetProps, "children"> {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle; // Optional style for the content view
}

/**
 * A reusable atom component wrapping the @gorhom/bottom-sheet library.
 * It simplifies usage by combining BottomSheet and BottomSheetView.
 *
 * @param {BottomSheetProps} props - The props for the component.
 * @param {React.Ref<BottomSheetMethods>} ref - Forwarded ref to the underlying RNBottomSheet component.
 * @returns {React.ReactElement} The rendered BottomSheet component.
 */
const BottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(
  ({ children, contentContainerStyle, ...restProps }, ref) => {
    return (
      <RNBottomSheet ref={ref} {...restProps}>
        <BottomSheetView
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {children}
        </BottomSheetView>
      </RNBottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1, // Default behavior: allow content to fill the sheet
    padding: 24, // Add some default padding; can be overridden
  },
});

export default BottomSheet;
