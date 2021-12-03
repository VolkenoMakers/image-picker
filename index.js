import { useImagePickerModal as uipm } from "./lib/ImagePicker";
import {
  launchImageLibraryAsync as lil,
  launchCameraAsync as lc,
} from "./lib/utils";

export const useImagePickerModal = uipm;
export const launchImageLibraryAsync = lil;
export const launchCameraAsync = lc;

export default {
  useImagePickerModal,
  launchImageLibraryAsync,
  launchCameraAsync,
};
