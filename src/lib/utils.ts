import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export function showMessage(message: string) {
  Alert.alert("", message);
}

export async function getCameraPermissionAsync(message?: string) {
  const { granted } = await ImagePicker.getCameraPermissionsAsync();
  if (!granted) {
    const { granted: g2 } = await ImagePicker.requestCameraPermissionsAsync();
    if (!g2) {
      showMessage(
        message ||
          "les autorisations de camera ont été refusées, veuillez vérifier les paramètres de l'application"
      );
      return false;
    }
  }
  return true;
}

export async function getMediaPermissionAsync(message?:string) {
  const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (!granted) {
    const { granted: g2 } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!g2) {
      showMessage(
        message ||
          "les autorisations de media ont été refusées, veuillez vérifier les paramètres de l'application"
      );
      return false;
    }
  }
  return true;
}

export async function launchImageLibraryAsync(
  options?: ImagePicker.ImagePickerOptions,
  unGrantedMessage?: string
) {
  const granted = await getMediaPermissionAsync(unGrantedMessage);
  if (!granted) {
    return null;
  }
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    ...options,
  });
  if (result.cancelled) return null;
  return result;
}
export async function launchCameraAsync(
  options?: ImagePicker.ImagePickerOptions,
  unGrantedMessage?: string
) {
  const granted = await getCameraPermissionAsync(unGrantedMessage);
  if (!granted) {
    return null;
  }
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    ...options,
  });

  if (result.cancelled) return null;

  return result;
}
