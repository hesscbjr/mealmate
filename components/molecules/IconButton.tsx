import Icon from "@/components/atoms/Icon";
import TouchableOpacityHaptic from "@/components/atoms/TouchableOpacityHaptic";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type BaseIconButtonProps = Omit<
  TouchableOpacityProps,
  "onPress" | "children" | "style" | "activeOpacity"
> & {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
};

type IconButtonProps =
  | (BaseIconButtonProps & {
      iconSet?: "fa5";
      name: React.ComponentProps<typeof FontAwesome5>["name"];
    })
  | (BaseIconButtonProps & {
      iconSet: "antdesign";
      name: React.ComponentProps<typeof AntDesign>["name"];
    });

const IconButton = ({
  onPress,
  name,
  size,
  color,
  iconSet = "fa5",
  style: externalStyle,
  ...rest
}: IconButtonProps) => {
  const finalStyle = [styles.base, externalStyle];

  return (
    <TouchableOpacityHaptic onPress={onPress} style={finalStyle} {...rest}>
      <Icon name={name} size={size} color={color} iconSet={iconSet} />
    </TouchableOpacityHaptic>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
  },
});
