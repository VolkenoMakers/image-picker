import {
  ImagePickerOptions,
  ImagePickerSuccessResult,
} from "expo-image-picker/build/ImagePicker.types";
import * as React from "react";
import { Image, Text, TextStyle, View } from "react-native";

import { Modal, TouchableOpacity } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync } from "./utils";

type ImagePickerModalOptions = {
  backgroundColor?: string;
  useCameraText?: string;
  joinImageText?: string;
  useCameraIcon?: React.ReactElement;
  joinImageIcon?: React.ReactElement;
  textStyle?: TextStyle;
  imagePickerOptions?: ImagePickerOptions;
  unGrantedCameraPermissionMessage?: string;
  unGrantedMediaPermissionMessage?: string;
};
export const useImagePickerModal = (
  cb: (result: ImagePickerSuccessResult) => void,
  options: ImagePickerModalOptions = {}
) => {
  const [show, setShow] = React.useState(false);
  const renderModal = React.useCallback(() => {
    const onPick = (isCamera: boolean) => {
      setShow(false);
      setTimeout(() => {
        if (isCamera) {
          launchCameraAsync(
            options.imagePickerOptions,
            options.unGrantedCameraPermissionMessage
          ).then((res) => {
            if (res) cb(res);
          });
        } else {
          launchImageLibraryAsync(
            options.imagePickerOptions,
            options.unGrantedMediaPermissionMessage
          ).then((res) => {
            if (res) cb(res);
          });
        }
      }, 400);
    };
    return (
      <>
        <PickModal
          visible={show}
          options={options}
          onHide={() => setShow(false)}
          onPick={onPick}
        />
      </>
    );
  }, [show]);
  const showModal = React.useCallback((flag: boolean) => {
    setShow(flag);
  }, []);
  return [showModal, renderModal] as [(flag: boolean) => void, () => any];
};
type ModalProps = {
  visible: boolean;
  onHide: () => void;
  onPick: (isCamera: boolean) => any;
  options: ImagePickerModalOptions;
};
const PickModal = ({ visible, onHide, onPick, options }: ModalProps) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onHide}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            backgroundColor: options.backgroundColor || "#EFEFEF",
            width: "100%",
            borderTopLeftRadius: 15,
            padding: 20,
            borderTopRightRadius: 15,
          }}
        >
          <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
            <TouchableOpacity onPress={() => onHide()}>
              <Image
                source={require("../assets/clear.png")}
                style={{ width: 34, height: 34, tintColor: "#F00" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{ marginHorizontal: 5, flex: 1, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#000",
                  marginBottom: 10,
                  ...options.textStyle,
                }}
              >
                {options.useCameraText || "Prendre une photo"}
              </Text>
              <TouchableOpacity onPress={() => onPick(true)}>
                {options.useCameraIcon || (
                  <Image
                    source={require("../assets/camera.png")}
                    style={{ width: 34, height: 34, tintColor: "#000" }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{ marginHorizontal: 5, flex: 1, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#000",
                  textAlign: "center",
                  width: "80%",
                  marginBottom: 10,
                  ...options.textStyle,
                }}
              >
                {options.joinImageText || "Charger une image"}
              </Text>
              <TouchableOpacity onPress={() => onPick(false)}>
                {options.joinImageIcon || (
                  <Image
                    source={require("../assets/img.png")}
                    style={{ width: 34, height: 34 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
