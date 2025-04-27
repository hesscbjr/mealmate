import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

// Define the props we expect, extending from DefaultTe
type TextProps = DefaultTextProps;

// Define a type for the potential rogue style props we want to intercept
type InterceptedStyleProps = {
  shadowColor?: TextStyle["shadowColor"];
  shadowOffset?: TextStyle["shadowOffset"];
  shadowOpacity?: TextStyle["shadowOpacity"];
  shadowRadius?: TextStyle["shadowRadius"];
  elevation?: TextStyle["elevation"];
  transform?: TextStyle["transform"];
};

const Text = ({ style, ...otherProps }: TextProps) => {
  const themeTextColor = useThemeColor({}, "text");

  // Use type assertion to acknowledge we might have extra style props
  const potentiallyMixedProps = otherProps as TextProps & InterceptedStyleProps;

  // Destructure the intercepted styles AND the correctly typed otherProps
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    transform,
    ...validOtherProps
  } = potentiallyMixedProps;

  const finalStyle: StyleProp<TextStyle> = [
    { color: themeTextColor },
    style,
  ].filter(Boolean) as StyleProp<TextStyle>;

  return <DefaultText style={finalStyle} {...validOtherProps} />;
};

export default Text;
