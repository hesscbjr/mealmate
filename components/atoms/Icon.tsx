import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

interface IconProps {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  size?: number;
  color?: string;
  iconSet?: "fa5" | "antdesign";
}

const Icon = ({
  name,
  size = 24,
  color = "black",
  iconSet = "fa5",
}: IconProps) => {
  try {
    if (iconSet === "fa5") {
      return <FontAwesome5 name={name} size={size} color={color} />;
    } else if (iconSet === "antdesign") {
      return <AntDesign name={name} size={size} color={color} />;
    }
    return null;
  } catch (error) {
    console.error("Error rendering icon:", error);
    return null;
  }
};

export default Icon;
