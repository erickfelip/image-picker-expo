import React, { useState } from "react";
import { View, StyleSheet, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function App() {
  const [image, setImage] = useState(null);
// aleterar permissão camera pdp
  const askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      Alert.alert("Error", "Deu erro");
      return false;
    }
    return true;
  };
  const takePhoto = async ({onPick}) => {
    const hasPermissions = await askForPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
      aspect: [4, 3],
    });

    setImage(img.uri);
    onPick(img.uri);
  };

  return (
    <View style={styles.wrapper}>
      <Button title="CRICA PA FOTO" onPress={takePhoto} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
}j

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});
