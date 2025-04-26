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
  color = "black",
  iconSet = "fa5",
  style,
}: IconProps) => {
  try {
    if (iconSet === "fa5") {
      return (
        <FontAwesome5 name={name} size={size} color={color} style={style} />
      );
    } else if (iconSet === "antdesign") {
      return <AntDesign name={name} size={size} color={color} style={style} />;
    }
    return null;
  } catch (error) {
    console.error("Error rendering icon:", error);
    return null;
  }
};

export default Icon;
