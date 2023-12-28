import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

export default function PickImage({
  btnMode,
  btnStyle,
  labelBtnStyle,
  imageStyle,
  handlePickImage,
  imageData,
  deleteImage,
}) {
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handlePickImage(result);
    }
  };

  return (
    <>
      {imageData.imageUri ? (
        <View style={myStyles.imageContainer}>
          <Image source={{ uri: imageData.imageUri }} style={imageStyle} />
          <IconButton icon="delete-outline" onPress={deleteImage} size={35} />
        </View>
      ) : (
        <View style={myStyles.selectImageStyle}>
          <Text>No has seleccionado ninguna imagen</Text>
          <Button
            mode={btnMode}
            onPress={pickImageFromGallery}
            style={btnStyle}
            labelStyle={labelBtnStyle}
            icon="image-outline"
          >
            Seleccionar imagen de tu galeria
          </Button>
        </View>
      )}
    </>
  );
}

const myStyles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  selectImageStyle:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    marginTop:10,
    marginBottom:20,
    gap:10
  }
});
