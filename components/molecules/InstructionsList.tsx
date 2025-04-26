import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import {
  AnalyzedInstruction,
  RecipeInstructionStep,
} from "@/services/spoonacular";

type InstructionsListProps = {
  analyzedInstructions?: AnalyzedInstruction[] | null;
  rawInstructions?: string | null;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  instructionSetNameStyle?: StyleProp<TextStyle>;
  stepNumberStyle?: StyleProp<TextStyle>;
  stepTextStyle?: StyleProp<TextStyle>;
};

const InstructionsList = ({
  analyzedInstructions,
  rawInstructions,
  style,
  titleStyle,
  instructionSetNameStyle,
  stepNumberStyle,
  stepTextStyle,
}: InstructionsListProps) => {
  const { text: themeText, tint: themeTint } = useThemeColor({}, [
    "text",
    "tint",
  ]);

  const hasAnalyzedInstructions =
    analyzedInstructions && analyzedInstructions.length > 0;
  const hasRawInstructions =
    rawInstructions && rawInstructions.trim().length > 0;

  if (!hasAnalyzedInstructions && !hasRawInstructions) {
    return null;
  }

  const renderInstructionStep = (
    item: RecipeInstructionStep,
    index: number
  ) => (
    <View key={`step-${index}`} style={styles.instructionStep}>
      <Text style={[styles.stepNumber, { color: themeTint }, stepNumberStyle]}>
        {item.number}
      </Text>
      <Text style={[styles.stepText, { color: themeText }, stepTextStyle]}>
        {item.step}
      </Text>
    </View>
  );

  return (
    <View style={[styles.section, style]}>
      <Text style={[styles.sectionTitle, { color: themeText }, titleStyle]}>
        Instructions
      </Text>

      {hasAnalyzedInstructions &&
        analyzedInstructions.map((instructionSet, index) => (
          <View key={`instruction-set-${index}`}>
            {instructionSet.name && (
              <Text
                style={[
                  styles.instructionSetName,
                  { color: themeText },
                  instructionSetNameStyle,
                ]}
              >
                {instructionSet.name}
              </Text>
            )}
            {instructionSet.steps.map(renderInstructionStep)}
          </View>
        ))}

      {!hasAnalyzedInstructions && hasRawInstructions && (
        <Text style={[styles.stepText, { color: themeText }, stepTextStyle]}>
          {rawInstructions}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 15,
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
    // Consider if needed for raw text alignment
  },
});

export default InstructionsList;
