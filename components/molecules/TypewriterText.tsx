import Text from "@/components/atoms/Text";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

type TypewriterTextProps = Omit<DefaultTextProps, "children"> & {
  messages: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  style?: StyleProp<TextStyle>;
};

const TypewriterText = ({
  messages,
  typingSpeed = 50,
  pauseDuration = 1000,
  style,
  ...rest
}: TypewriterTextProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearAllTimeouts = () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      typingTimeoutRef.current = null;
      pauseTimeoutRef.current = null;
    };

    if (!messages || messages.length === 0 || !messages[messageIndex]) {
      clearAllTimeouts();
      setDisplayText("");
      setCharIndex(0);
      setMessageIndex(0);
      return;
    }

    const currentMessage = messages[messageIndex];

    if (charIndex < currentMessage.length) {
      clearAllTimeouts();

      typingTimeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => prev + currentMessage[charIndex]);
        Haptics.selectionAsync();
        setCharIndex((prev) => prev + 1);
        typingTimeoutRef.current = null;
      }, typingSpeed);
    } else if (charIndex >= currentMessage.length) {
      clearAllTimeouts();

      pauseTimeoutRef.current = setTimeout(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setCharIndex(0);
        setDisplayText("");
        pauseTimeoutRef.current = null;
      }, pauseDuration);
    }

    return clearAllTimeouts;
  }, [messages, messageIndex, charIndex, typingSpeed, pauseDuration]);

  return (
    <Text style={style} {...rest}>
      {displayText || "\u00A0"}
    </Text>
  );
};

export default TypewriterText;
