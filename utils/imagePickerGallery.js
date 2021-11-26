import * as ImagePicker from "expo-image-picker";

export default async function imagePickerGallery() {
  const cameraRollPerm =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   console.log(cameraRollPerm);

  if (cameraRollPerm.status === "granted") {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    // console.log(pickerResult);
    return pickerResult.uri;
  }
}
