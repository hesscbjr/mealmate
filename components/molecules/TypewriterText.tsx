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

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };

    if (
      messages &&
      messages.length > 0 &&
      charIndex < messages[messageIndex].length
    ) {
      clearTimers();

      typingIntervalRef.current = setInterval(() => {
        if (charIndex < messages[messageIndex]?.length) {
          setDisplayText((prev) => prev + messages[messageIndex][charIndex]);
          Haptics.selectionAsync();
          setCharIndex((prev) => prev + 1);
        } else {
          clearTimers();
        }
      }, typingSpeed);
    } else if (
      messages &&
      messages.length > 0 &&
      charIndex >= messages[messageIndex].length
    ) {
      clearTimers();

      if (!pauseTimeoutRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setCharIndex(0);
          setDisplayText("");
          pauseTimeoutRef.current = null;
        }, pauseDuration);
      }
    } else {
      clearTimers();
      setDisplayText("");
      setCharIndex(0);
      setMessageIndex(0);
    }

    return clearTimers;
  }, [messages, messageIndex, charIndex, typingSpeed, pauseDuration]);

  return (
    <Text style={style} {...rest}>
      {displayText || "\u00A0"}
    </Text>
  );
};

export default TypewriterText;
