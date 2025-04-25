/**
 * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
 * Then returns a new array with the shuffled elements.
 * Generic type <T> allows shuffling arrays of any type.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy to avoid modifying the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements shuffledArray[i] and shuffledArray[j]
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
} 