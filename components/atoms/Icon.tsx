import { FontAwesome5 } from "@expo/vector-icons";

interface IconProps {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = "black" }: IconProps) => {
  return <FontAwesome5 name={name} size={size} color={color} />;
};

export default Icon;
