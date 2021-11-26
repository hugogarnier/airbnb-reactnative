import * as ImagePicker from "expo-image-picker";

export default async function imagePickerCamera() {
  const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
  const cameraRollPerm =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (cameraPerm.status === "granted" && cameraRollPerm.status === "granted") {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return pickerResult.uri;
  }
}
