import { useImagePickerModal as uipm } from "./lib/ImagePicker";
import {
  launchCameraAsync as lc,
  launchImageLibraryAsync as lil,
} from "./lib/utils";

export const useImagePickerModal = uipm;
export const launchImageLibraryAsync = lil;
export const launchCameraAsync = lc;

export default {
  useImagePickerModal,
  launchImageLibraryAsync,
  launchCameraAsync,
};
