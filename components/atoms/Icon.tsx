import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";

export interface IconProps {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  size?: number;
  color?: string;
  iconSet?: "fa5" | "antdesign";
  style?: StyleProp<TextStyle>;
}

const Icon = ({
  name,
  size = 24,
  color,
  iconSet = "fa5",
  style,
}: IconProps) => {
  const { icon: themeIconColor } = useThemeColor({}, ["icon"]);
  const finalColor = color ?? themeIconColor;

  if (iconSet === "fa5") {
    return (
      <FontAwesome5 name={name} size={size} color={finalColor} style={style} />
    );
  } else if (iconSet === "antdesign") {
    return (
      <AntDesign
        name={name as React.ComponentProps<typeof AntDesign>["name"]}
        size={size}
        color={finalColor}
        style={style}
      />
    );
  }

  console.warn(`Invalid iconSet "${iconSet}" provided to Icon component.`);
  return null;
};

export default Icon;
