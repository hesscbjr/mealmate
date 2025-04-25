// Define the structure for parsed segments
// export type SummarySegment = // No longer used directly by the return type
//   | { type: 'text'; content: string }
//   | { type: 'link'; content: string; recipeId: string };

// Define the structure for a related recipe link
export interface RelatedRecipeLink {
  id: string;
  title: string;
}

// Define the return structure for the parsing function
export interface ParsedSummary {
  summaryText: string;
  relatedRecipes: RelatedRecipeLink[];
}

// Regex to find links like <a href="...ID">TEXT</a>
const linkRegex = /<a href="[^"]*?(\d+)"[^>]*>(.+?)<\/a>/g;
// Regex to strip remaining basic HTML tags like <b>, <i>, etc.
const stripHtmlRegex = /<[^>]*>/g;
// Regex to find sentence terminators followed by a space or end of string
const sentenceEndRegex = /([.!?])(\s+|$)/g;

/**
 * Parses an HTML summary string, separates the main text from related recipe links,
 * and strips HTML tags. Assumes related links start in the sentence containing the first link.
 * @param summaryHtml - The HTML summary string from Spoonacular.
 * @returns A ParsedSummary object containing the cleaned summary text and an array of related recipe links.
 */
export function parseAndLinkSummary(summaryHtml: string | null): ParsedSummary {
  const result: ParsedSummary = { summaryText: '', relatedRecipes: [] };
  if (!summaryHtml) return result;

  let match;
  let firstLinkIndex = -1;

  // Find the index of the first link
  linkRegex.lastIndex = 0; // Reset regex state
  const firstMatch = linkRegex.exec(summaryHtml);
  if (firstMatch) {
    firstLinkIndex = firstMatch.index;
  }

  let splitIndex = summaryHtml.length; // Default to full summary if no links

  if (firstLinkIndex !== -1) {
    // Search backwards from the first link for the start of its sentence
    const textBeforeLink = summaryHtml.substring(0, firstLinkIndex);
    let lastSentenceEnd = -1;
    let sentenceMatch;

    sentenceEndRegex.lastIndex = 0; // Reset regex state
    while ((sentenceMatch = sentenceEndRegex.exec(textBeforeLink)) !== null) {
        // Find the index right after the punctuation and space/end
        lastSentenceEnd = sentenceMatch.index + sentenceMatch[0].length;
    }

    // If a sentence end was found, split there. Otherwise, the link is in the first sentence (split at 0).
    // Ensure leading/trailing spaces are handled after splitting.
    splitIndex = (lastSentenceEnd !== -1) ? lastSentenceEnd : 0;
  }

  // Extract and clean the main summary text before the split point
  result.summaryText = summaryHtml
    .substring(0, splitIndex)
    .replace(stripHtmlRegex, '')
    .trim();

  // Extract all related recipe links from the *entire* original summary
  linkRegex.lastIndex = 0; // Reset regex state again for full iteration
  while ((match = linkRegex.exec(summaryHtml)) !== null) {
    const recipeId = match[1]; // Captured ID
    const linkText = match[2]; // Captured link text

    if (recipeId && linkText) {
      const cleanLinkText = linkText.replace(stripHtmlRegex, '').trim();
       if (cleanLinkText) {
         result.relatedRecipes.push({ id: recipeId, title: cleanLinkText });
       }
    }
  }

  // If the summary became empty after splitting (e.g., only contained the related part),
  // maybe return a generic message or the original (stripped) summary?
  // For now, we allow it to be empty. Consider fallback if needed.
  if (!result.summaryText && summaryHtml && result.relatedRecipes.length > 0) {
      // Potential fallback: Use the full stripped summary if the split resulted in empty text
      // result.summaryText = summaryHtml.replace(stripHtmlRegex, '').trim();
      // console.warn("Summary text became empty after splitting, consider fallback.");
  }

  return result;
}

// // Optional: A helper component to render the segments directly
// interface LinkedSummaryProps {
//   summaryHtml: string | null;
//   textStyle?: object; // Consider using StyleProp<TextStyle> for better type safety
//   linkStyle?: object; // Consider using StyleProp<TextStyle> for better type safety
// }
//
// // Define the component without explicit React.FC
// const LinkedSummary = ({
//   summaryHtml,
//   textStyle,
//   linkStyle,
// }: LinkedSummaryProps) => {
//   const segments = parseAndLinkSummary(summaryHtml);
//
//   // The outer Text component applies the base text style
//   return (
//     <Text style={textStyle}>
//       {segments.map((segment, index) => {
//         if (segment.type === 'link') {
//           return (
//             // Use asChild to allow the Link to use the nested Text as its clickable element
//             <Link key={`seg-${index}`} href={`/recipe/${segment.recipeId}`} asChild>
//                {/* Apply specific link styling here */}
//                <Text style={linkStyle}>{segment.content}</Text>
//             </Link>
//           );
//         } else {
//           // Render plain text segments directly
//           return <Text key={`seg-${index}`}>{segment.content}</Text>;
//         }
//       })}
//     </Text>
//   );
// }; 