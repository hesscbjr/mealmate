import Icon from "@/components/atoms/Icon";
import TouchableOpacityHaptic from "@/components/atoms/TouchableOpacityHaptic";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

// --- IconButton Prop Types ---
// Base props including TouchableOpacityProps (excluding conflicting ones)
interface BaseIconButtonProps
  extends Omit<TouchableOpacityProps, "onPress" | "children" | "style"> {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
}

// Conditional type for IconButton props based on iconSet
type IconButtonProps =
  | (BaseIconButtonProps & {
      iconSet?: "fa5";
      name: React.ComponentProps<typeof FontAwesome5>["name"];
    })
  | (BaseIconButtonProps & {
      iconSet: "antdesign";
      name: React.ComponentProps<typeof AntDesign>["name"];
    });

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  // Icon props
  name,
  size,
  color,
  iconSet = "fa5", // Default to fa5 if not provided
  // TouchableOpacity props
  style,
  activeOpacity,
  ...rest // Capture any other TouchableOpacityProps
}) => {
  return (
    <TouchableOpacityHaptic
      onPress={onPress}
      style={style} // Pass style to the touchable wrapper
      activeOpacity={activeOpacity} // Pass activeOpacity
      {...rest} // Pass remaining props
    >
      {/* Render Icon using the correctly typed props */}
      <Icon name={name as any} size={size} color={color} iconSet={iconSet} />
      {/*
         Casting 'name' to 'any' is still a pragmatic workaround here.
         While IconButtonProps is correctly typed, destructured props within
         the component don't automatically narrow the union type for the Icon component.
         The Icon component itself handles the validation.
       */}
    </TouchableOpacityHaptic>
  );
};

export default IconButton;
