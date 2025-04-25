
// Define the structure for parsed segments
export type SummarySegment =
  | { type: 'text'; content: string }
  | { type: 'link'; content: string; recipeId: string };

// Regex to find links like <a href="...ID">TEXT</a>
// It captures the ID (digits at the end of href) and the link text.
const linkRegex = /<a href=".*?(\d+)">(.+?)<\/a>/g;
// Regex to strip remaining basic HTML tags like <b>, <i>, etc.
const stripHtmlRegex = /<[^>]*>/g;

/**
 * Parses an HTML summary string, extracts recipe links, and strips other HTML tags.
 * Returns an array of segments for rendering.
 * @param summaryHtml - The HTML summary string from Spoonacular.
 * @returns An array of SummarySegment objects.
 */
export function parseAndLinkSummary(summaryHtml: string | null): SummarySegment[] {
  if (!summaryHtml) return [];

  const segments: SummarySegment[] = [];
  let lastIndex = 0;
  let match;

  // Reset regex state
  linkRegex.lastIndex = 0;

  // Find all link matches
  while ((match = linkRegex.exec(summaryHtml)) !== null) {
    const index = match.index;
    const recipeId = match[1]; // Captured ID
    const linkText = match[2]; // Captured link text

    // Add the text segment before the link
    if (index > lastIndex) {
      const textContent = summaryHtml
        .substring(lastIndex, index)
        .replace(stripHtmlRegex, ''); // Strip other tags
      if (textContent.trim()) {
        segments.push({ type: 'text', content: textContent });
      }
    }

    // Add the link segment
    if (recipeId && linkText) {
        // Also strip any potential tags within the link text itself
       const cleanLinkText = linkText.replace(stripHtmlRegex, '');
      segments.push({ type: 'link', content: cleanLinkText, recipeId });
    }

    lastIndex = linkRegex.lastIndex; // Update the index for the next iteration
  }

  // Add any remaining text after the last link
  if (lastIndex < summaryHtml.length) {
    const textContent = summaryHtml
      .substring(lastIndex)
      .replace(stripHtmlRegex, ''); // Strip other tags
    if (textContent.trim()) {
      segments.push({ type: 'text', content: textContent });
    }
  }

  return segments;
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