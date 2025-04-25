import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import {
  AnalyzedInstruction,
  RecipeInstructionStep,
} from "@/services/spoonacular";

interface InstructionsListProps {
  analyzedInstructions?: AnalyzedInstruction[] | null;
  rawInstructions?: string | null;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  instructionSetNameStyle?: StyleProp<TextStyle>;
  stepNumberStyle?: StyleProp<TextStyle>;
  stepTextStyle?: StyleProp<TextStyle>;
  titleColor?: string;
  setNameColor?: string;
  stepNumberColor?: string;
  stepTextColor?: string;
  borderColor?: string;
}

const InstructionsList: React.FC<InstructionsListProps> = ({
  analyzedInstructions,
  rawInstructions,
  style,
  titleStyle,
  instructionSetNameStyle,
  stepNumberStyle,
  stepTextStyle,
  titleColor = "#000",
  setNameColor = "#000",
  stepNumberColor = "#007AFF", // Default to tint color
  stepTextColor = "#000",
  borderColor = "#ccc",
}) => {
  const hasAnalyzedInstructions =
    analyzedInstructions && analyzedInstructions.length > 0;
  const hasRawInstructions =
    rawInstructions && rawInstructions.trim().length > 0;

  // Don't render if neither type of instruction is available
  if (!hasAnalyzedInstructions && !hasRawInstructions) {
    return null;
  }

  // Helper to render a single step
  const renderInstructionStep = (
    item: RecipeInstructionStep,
    index: number
  ) => (
    <View key={`step-${index}`} style={styles.instructionStep}>
      <Text
        style={[styles.stepNumber, { color: stepNumberColor }, stepNumberStyle]}
      >
        {item.number}
      </Text>
      <Text style={[styles.stepText, { color: stepTextColor }, stepTextStyle]}>
        {item.step}
      </Text>
    </View>
  );

  return (
    <View style={[styles.section, { borderTopColor: borderColor }, style]}>
      <Text style={[styles.sectionTitle, { color: titleColor }, titleStyle]}>
        Instructions
      </Text>

      {/* Render Analyzed Instructions if available */}
      {hasAnalyzedInstructions &&
        analyzedInstructions.map((instructionSet, index) => (
          <View key={`instruction-set-${index}`}>
            {instructionSet.name && (
              <Text
                style={[
                  styles.instructionSetName,
                  { color: setNameColor },
                  instructionSetNameStyle,
                ]}
              >
                {instructionSet.name}
              </Text>
            )}
            {instructionSet.steps.map(renderInstructionStep)}
          </View>
        ))}

      {/* Fallback for raw instructions string if no analyzed instructions */}
      {!hasAnalyzedInstructions && hasRawInstructions && (
        <Text
          style={[styles.stepText, { color: stepTextColor }, stepTextStyle]}
        >
          {rawInstructions}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionSetName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  instructionStep: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 20, // Ensure space for number
    textAlign: "right",
    marginTop: 2, // Add top margin for visual alignment
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    // Add marginLeft for raw instructions fallback if needed
    // marginLeft: 5, // Consider if needed for raw text alignment
  },
});

export default InstructionsList;
