import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from "react-native";

type TextProps = DefaultTextProps & {};

const Text = ({ style, ...otherProps }: TextProps) => {
  const themeTextColor = useThemeColor({}, "text");

  return (
    <DefaultText style={[{ color: themeTextColor }, style]} {...otherProps} />
  );
};

export default Text;
