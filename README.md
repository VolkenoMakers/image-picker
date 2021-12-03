# image-picker

![Single select](https://raw.githubusercontent.com/VolkenoMakers/image-picker/files/demo.gif)

## Add it to your project

- Using NPM
  `npm install @volkenomakers/image-picker`
  `expo install expo-image-picker`
- or:
- Using Yarn
  `yarn add @volkenomakers/image-picker`
  `expo install expo-image-picker`

## Usage

```javascript
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import {
  useImagePickerModal,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "@volkenomakers/image-picker";

const ImagePickerApp = () => {
  const [showModal, renderModal] = useImagePickerModal(
    (result) => {
      if (result) {
        console.log(result.uri);
      }
    },
    {
      joinImageText: "Join an image",
      useCameraText: "Open camera",
    }
  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {renderModal()}
      <Button title="Show Picker modal" onPress={() => showModal(true)} />
      <Button
        title="Open camera"
        onPress={() => launchCameraAsync()}
        containerStyle={{ marginVertical: 20 }}
      />
      <Button title="Pick image" onPress={() => launchImageLibraryAsync()} />
    </View>
  );
};

export default ImagePickerApp;
```
