export interface RelatedRecipeLink {
  id: string;
  title: string;
}
export interface RelatedRecipe {
  id: string;
  title: string;
}
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

  linkRegex.lastIndex = 0;
  const firstMatch = linkRegex.exec(summaryHtml);
  if (firstMatch) {
    firstLinkIndex = firstMatch.index;
  }

  let splitIndex = summaryHtml.length;

  if (firstLinkIndex !== -1) {
    const textBeforeLink = summaryHtml.substring(0, firstLinkIndex);
    let lastSentenceEnd = -1;
    let sentenceMatch;

    sentenceEndRegex.lastIndex = 0;
    while ((sentenceMatch = sentenceEndRegex.exec(textBeforeLink)) !== null) {
      lastSentenceEnd = sentenceMatch.index + sentenceMatch[0].length;
    }

    splitIndex = (lastSentenceEnd !== -1) ? lastSentenceEnd : 0;
  }

  result.summaryText = summaryHtml
    .substring(0, splitIndex)
    .replace(stripHtmlRegex, '')
    .trim();

  linkRegex.lastIndex = 0;
  while ((match = linkRegex.exec(summaryHtml)) !== null) {
    const recipeId = match[1];
    const linkText = match[2];

    if (recipeId && linkText) {
      const cleanLinkText = linkText.replace(stripHtmlRegex, '').trim();
       if (cleanLinkText) {
         result.relatedRecipes.push({ id: recipeId, title: cleanLinkText });
       }
    }
  }
  return result;
}