import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { Colors } from "../tools/constant";
import * as ImagePicker from "expo-image-picker";
import Message from "../components/Message";
import { server } from "../api/server";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

export default function SelectImagesScreen({ navigation, route }) {
  const user = useSelector(state=>state.user.user)
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingResponse,setLoadingResponse] = useState(false)
  const [existHost,setExistHost] = useState(false)

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      /* allowsEditing:true, */
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setMessage("");
      if (result.assets.length > 3) {
        setMessage("Solo se puede seleccionar como maximo tres imagenes");
        return;
      }
      /* let arrayOfImagesUri = result.assets.map((image) => {
        return image.uri;
      }); */
      setImages(result.assets);
    }
  };

  const validateData = () =>{
    if(images.length==0){
      setMessage("Debes seleccionar imagenes para continuar")
      return
    }
    navigation.navigate("CreateHost", { images: images })
  }

  const deleteAllImages = () => setImages([]);

  const checkIfAnyHostCreated = async () =>{
    setLoadingResponse(true)
        try {
            const {data} = await server.get(`/host/check/${user._id}`)
            if(data.result) setExistHost(true)
        } catch (error) {
           /*  setError(error.response.data) */
        }
      setLoadingResponse(false)
   }

  useEffect(()=>{
    checkIfAnyHostCreated()
  },[])

  if(loadingResponse) return <Loading />

  if(existHost) return <View style={myStyles.messageContainer}>
      <Text style={{fontSize:15}}>Ya tienes un hospedaje creado!</Text>
  </View>

  return (
    <View style={myStyles.container}>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 10,
          marginTop: 10,
          fontSize: 16,
        }}
      >
        sube las imagenes de tu hospedaje
      </Text>
        {images.length > 0 ? (
          <View style={myStyles.imageContainer}>
          {images.map((value, index) => (
            <View style={myStyles.imageItemContainer} key={index}>
              <Image source={{ uri: value.uri }} style={myStyles.imagesStyle} />
            </View>
          ))}
          </View>
        ) : (
          <Text style={{textAlign:"center"}}>
            Aun no has seleccionado ninguna imagen
          </Text>
        )}

      {images.length ? (
        <View style={myStyles.btnActionContainer}>
          <Button
            mode="contained"
            onPress={() => deleteAllImages()}
            icon="delete"
            style={myStyles.btnDelete}
          >
            Eliminar y volver a seleccionar
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              /* navigation.navigate("CreateHost", { images: images }) */
              validateData()
              }
            icon="chevron-right"
            style={myStyles.btnNext}
          >
            Continuar al proximo paso
          </Button>
        </View>
      ) : (
        <View style={{display:"flex",flexDirection:"row",justifyContent:"center",padding:10}}>
            <Button
            mode="contained"
            onPress={pickImages}
            style={myStyles.btnSelecTImage}
            icon="image-outline"
          >
            Seleccionar de mi galeria
          </Button>
        </View>
      )}
      {message && <Message msg={message} type="warning" />}
    </View>
  );
}

const myStyles = StyleSheet.create({
  messageContainer:{
    backgroundColor:Colors.backgroundColor,
    flex:1,
    padding:10,
    alignItems:"center",
    justifyContent:"center"
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: Colors.backgroundColor,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imagesStyle: {
    width: 170,
    height: 170,
    marginTop: 10,
    borderRadius: 10,
  },
  btnActionContainer: {
    marginTop: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  btnDelete: {
    borderRadius: 10,
    backgroundColor: Colors.principal,
    padding: 3,
    width: 250,
  },
  btnNext: {
    borderRadius: 10,
    backgroundColor: Colors.principal,
    padding: 3,
    width: 250,
  },
  titleNotImage: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 13,
    textAlign:"center"
  },
  btnSelecTImage: {
    borderRadius: 10,
    backgroundColor: Colors.principal,
    padding: 3,
    width: 250,
  },
});
