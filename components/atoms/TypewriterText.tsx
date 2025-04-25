import React, { useEffect, useRef, useState } from "react";
// Import TextProps directly from react-native
import Text from "@/components/atoms/Text"; // Import our custom Text atom
import * as Haptics from "expo-haptics"; // Re-import expo-haptics
import {
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

// Extend the default TextProps, but omit 'children' as we control it internally
interface TypewriterTextProps extends Omit<DefaultTextProps, "children"> {
  messages: string[];
  typingSpeed?: number; // Milliseconds per character
  pauseDuration?: number; // Milliseconds to wait after typing completes
  style?: StyleProp<TextStyle>;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  messages,
  typingSpeed = 50, // Default typing speed: 50ms/char
  pauseDuration = 1000, // Default pause: 1 second
  style,
  ...rest // Pass other Text props like accessibilityLabel, etc.
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Refs to store interval and timeout IDs to clear them correctly
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timers when props change or component unmounts
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

    // Reset state if messages array changes significantly (e.g., becomes empty or different)
    // This prevents errors if messages are updated externally.
    // Don't reset display text here, let the logic handle it to avoid flicker
    // setDisplayText('');
    // setCharIndex(0);
    // Optional: reset messageIndex too if you want it to always start from the first message on prop change
    // setMessageIndex(0);

    // Start typing if there are messages and the current message isn't fully typed yet
    if (
      messages &&
      messages.length > 0 &&
      charIndex < messages[messageIndex].length
    ) {
      clearTimers(); // Ensure no old timers are running

      typingIntervalRef.current = setInterval(() => {
        // Important: Check bounds within interval in case props change rapidly
        if (charIndex < messages[messageIndex]?.length) {
          setDisplayText((prev) => prev + messages[messageIndex][charIndex]);

          // Trigger selection haptic feedback for every character typed
          Haptics.selectionAsync(); // Use selectionAsync without throttling

          setCharIndex((prev) => prev + 1);
        } else {
          // If we somehow got here with charIndex out of bounds, clear interval
          clearTimers();
        }
      }, typingSpeed);
    } else if (
      messages &&
      messages.length > 0 &&
      charIndex >= messages[messageIndex].length
    ) {
      // Message is fully typed, start the pause timer
      clearTimers(); // Clear typing interval

      // Only set timeout if not already running
      if (!pauseTimeoutRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          // Move to the next message (looping)
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          // Reset for the next message
          setCharIndex(0);
          setDisplayText(""); // Clear display text for the new message
          pauseTimeoutRef.current = null; // Clear the ref after timeout runs
        }, pauseDuration);
      }
    } else {
      // Handle cases like empty messages array or messages becoming empty
      clearTimers();
      setDisplayText("");
      setCharIndex(0);
      setMessageIndex(0);
    }

    // Cleanup function: clear timers on unmount or before effect re-runs
    return clearTimers;
  }, [messages, messageIndex, charIndex, typingSpeed, pauseDuration]); // Dependencies that trigger effect

  // Render the custom Text component with the currently displayed text
  // Add a non-breaking space if displayText is empty to maintain height and prevent layout shift
  return (
    <Text style={style} {...rest}>
      {displayText || "\u00A0"}
    </Text>
  );
};

export default TypewriterText;
