import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "mealmate:photos";

export async function savePhoto(uri: string) {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const photos = existing ? JSON.parse(existing) : [];
    if (!photos.includes(uri)) {
      const newPhotos = [uri, ...photos];
      await AsyncStorage.setItem(KEY, JSON.stringify(newPhotos));
    }
  } catch (error) {
    console.error("Failed to save photo", error);
  }
}

export async function getSavedPhotos(): Promise<string[]> {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load photos", error);
    return [];
  }
}

export async function setPhotosInStorage(uris: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(uris));
  } catch (error) {
    console.error("Failed to set photos in storage", error);
  }
}
