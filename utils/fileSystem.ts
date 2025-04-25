import * as FileSystem from 'expo-file-system';

/**
 * Reads a file from the given URI and returns its contents as a base64-encoded string.
 * @param uri - The URI of the file to read.
 * @returns A promise that resolves to the base64-encoded string of the file contents.
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
