# intro-slider

![Single select](https://raw.githubusercontent.com/VolkenoMakers/intro-slider/files/demo.gif)

## Add it to your project

- Using NPM
  `npm install @volkenomakers/intro-slider`
- or:
- Using Yarn
  `yarn add @volkenomakers/intro-slider`

## Usage

```javascript
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import {
  useImagePickerModal,
  launchCameraAsync,
  launchImageLibraryAsync,
} from "../image-picker/index";

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

## Properties

| Property name        | Type       | Description                                                 |
| -------------------- | ---------- | ----------------------------------------------------------- |
| **data**             | _Array_    | array of object with keys (title,descriptio, imge)          |
| **onEnd**            | _Function_ | callback to be called when the user click to the end button |
| **imageProps**       | _Object_   | props for the image                                         |
| **descriptionStyle** | _Object_   | Custom style for the text description                       |
| **titleStyle**       | _Object_   | Custom style for the title                                  |
| **containerStyle**   | _Object_   | Custom style for the View container                         |
| **indicatorColor**   | _String_   | color of the indicators                                     |
| **indicatorSize**    | _Number_   | size of the indicators                                      |
| **renderNextButton** | _Function_ | render the next button                                      |
| **renderEndButton**  | _String_   | render the end button                                       |

**ISC Licensed**
