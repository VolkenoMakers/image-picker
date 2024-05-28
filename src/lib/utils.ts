import {
  launchCameraAsync as expoLaunchCameraAsync,
  launchImageLibraryAsync as expoLaunchImageLibraryAsync,
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  ImagePickerOptions,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Alert } from "react-native";

export function showMessage(message: string) {
  Alert.alert("", message);
}

export async function getCameraPermissionAsync(message?: string) {
  const { granted } = await getCameraPermissionsAsync();
  if (!granted) {
    const { granted: g2 } = await requestCameraPermissionsAsync();
    if (!g2) {
      showMessage(
        message ||
          "Les autorisations de camera ont été refusées, veuillez vérifier les paramètres de l'application"
      );
      return false;
    }
  }
  return true;
}

export async function getMediaPermissionAsync(message?: string) {
  const { granted } = await getMediaLibraryPermissionsAsync();
  if (!granted) {
    const { granted: g2 } = await requestMediaLibraryPermissionsAsync();
    if (!g2) {
      showMessage(
        message ||
          "Les autorisations de media ont été refusées, veuillez vérifier les paramètres de l'application"
      );
      return false;
    }
  }
  return true;
}

export async function launchImageLibraryAsync(
  options?: ImagePickerOptions,
  unGrantedMessage?: string
) {
  const granted = await getMediaPermissionAsync(unGrantedMessage);
  if (!granted) {
    return null;
  }
  let result = await expoLaunchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    ...options,
  });
  if (result.canceled) return null;
  return result;
}
export async function launchCameraAsync(
  options?: ImagePickerOptions,
  unGrantedMessage?: string
) {
  const granted = await getCameraPermissionAsync(unGrantedMessage);
  if (!granted) {
    return null;
  }
  let result = await expoLaunchCameraAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    ...options,
  });

  if (result.canceled) return null;

  return result;
}
