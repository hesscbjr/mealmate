import * as FileSystem from 'expo-file-system';

/**
 * Reads an image file from the given URI and returns its contents as a base64-encoded string.
 * This is used in the ingredient extraction process to prepare the image data for analysis by the backend service (e.g., OpenAI).
 * @param uri - The URI of the image file (e.g., from the camera or gallery).
 * @returns A promise that resolves to the base64-encoded string of the image file contents.
 */
export async function readFileAsBase64(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error reading file as base64:', error);
    throw error;
  }
}
