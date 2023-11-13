import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  TextInput,
  Text,
  Button,
  ActivityIndicator,
  IconButton,
  Portal,
  Modal,
} from "react-native-paper";
import InputView from "../components/InputView";
import { Colors } from "../tools/constant";
import DeleteHost from "../components/DeleteHost";
import { useSelector } from "react-redux";
import { server } from "../api/server";
import SinHospedaje from "../../assets/sinhospedaje.png";
import { Image } from "expo-image";
import Message from "../components/Message";
import * as ImagePicker from "expo-image-picker";
import NoPhoto from "../../assets/nophoto.png";

const UploadImageModal = ({ visible, hideModal, uploadImage}) => {
  const [image, setImage] = useState("");

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDeleteImage = () => setImage("")

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={myStyles.modalUploadContainer}
        >
          <View style={myStyles.uploadViewContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <IconButton icon="close" size={30} onPress={hideModal} />
            </View>
            <Text style={{ textAlign: "center" }}>
              Selecciona una imagen de tu galeria
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150,borderRadius:5 }}
                />
              ) : (
                <Image source={NoPhoto} style={{ width: 150, height: 150 }} />
              )}
              {image && (
                <IconButton icon="delete-outline" iconColor="red" size={30} onPress={handleDeleteImage}/>
              )}
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Button
                mode="outlined"
                icon="image-search"
                style={{ borderRadius: 10 }}
                labelStyle={{ color: "#000000" }}
                onPress={pickImageFromGallery}
              >
                Ver galeria
              </Button>
              {image && (
                <Button
                  mode="contained"
                  onPress={()=>uploadImage(image)}
                  style={{
                    borderRadius: 10,
                    backgroundColor: Colors.principal,
                    width: 200,
                  }}
                >
                  Confirmar
                </Button>
              )}
            </View>
          </View>
        </Modal>
      </Portal>

     <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
     <Button
        icon="plus"
        mode="outlined"
        labelStyle={{borderRadius:10,color:"#000000"}}
        onPress={hideModal}
      >
        Agregar Imagen
      </Button>
     </View>
    </>
  );
};

export default function ViewHostScreen({ navigation }) {
  const { user } = useSelector((state) => state.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hostData, setHostData] = useState({});
  const [dltImageModal, setDltImageModal] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const [uploadImageModal, setUploadImageModal] = useState(false);

  const handleUploadImageModal = () => setUploadImageModal(!uploadImageModal)

  const handleAddImage = async (imageUri) => {
    handleUploadImageModal(false)
    setDltImageModal(true);
    setErrorImage("");
    const formData = new FormData();
    formData.append("uploadImage", {
      name: new Date() + "_uploadImage",
      uri: imageUri,
      type: "image/jpg",
    });
    try {
      let response = await server.post(
        `/host/${hostData._id}/updateimage`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setHostData({ ...hostData, hostImages: response.data });
    } catch (error) {
      setErrorImage("Ocurrio un error al agregar una imagen");
    }
    setDltImageModal(false);
  };

  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteImage = async (imageName) => {
    setDltImageModal(true);
    setErrorImage("");
    try {
      let response = await server.delete(
        `/host/${hostData._id}/image/${imageName}`
      );
      setHostData({ ...hostData, hostImages: response.data });
    } catch (error) {
      setErrorImage("Ocurrio un error al eliminar la imagen");
    }
    setDltImageModal(false);
  };

  const getOwnerHostbyID = async () => {
    setLoading(true);
    try {
      let response = await server.get(`/host/owner/${user._id}`);
      if (response.data) setHostData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOwnerHostbyID();
  }, []);

  if (loading)
    return (
      <View style={myStyles.loadingContainer}>
        <ActivityIndicator animating={true} size={40} />
      </View>
    );

  if (Object.keys(hostData).length === 0)
    return (
      <View style={myStyles.emptyContainer}>
        <Text style={myStyles.notHostTitle}>
          Aun no tienes creado un hospedaje!
        </Text>
        <Image source={SinHospedaje} style={myStyles.imageStyle} />
      </View>
    );

  return (
    <ScrollView style={myStyles.container}>
      <View style={myStyles.btnActionContainer}>
        <Button
          icon="pencil"
          onPress={() =>
            navigation.navigate("UpdateHostData", { hostDataId: user._id })
          }
          compact
          labelStyle={myStyles.btnActionEditStyles}
        />
        <Button
          icon="delete"
          onPress={() => handleDeleteModal()}
          compact
          labelStyle={myStyles.btnActionDltStyles}
        />
      </View>
      <Text style={myStyles.title}>Datos de tu alojamiento</Text>
      <InputView
        label="Nombre descriptivo de tu alojamiento"
        editable={false}
        value={hostData.hostDescription}
        icon="format-title"
      />

      <InputView
        label="La ubicacion es por defecto la de tus datos"
        editable={false}
        value={hostData.hostOwnerId?.userUbication}
        icon="map-marker-outline"
      />

      <InputView
        label="Admites en KG..."
        editable={false}
        value={`${hostData.hostAnimalWeightFrom}KG - ${hostData.hostAnimalWeightTo}KG`}
        icon="paw"
      />

      <InputView
        label="Edad que admites..."
        editable={false}
        value={`${hostData.hostAnimalAgeFrom} - ${hostData.hostAnimalAgeTo} años`}
        icon="paw"
      />

      <InputView
        label="Capacidad maxima de huespedes"
        editable={false}
        value={hostData.hostOwnerCapacity}
        typeInput="numeric"
        inputStyles={myStyles.inputNumberStyle}
        icon="paw"
      />

      <InputView
        label="Costo de estadia"
        editable={false}
        value={hostData.hostPrice}
        typeInput="numeric"
        icon="currency-usd"
        inputStyles={myStyles.inputNumberStyle}
      />

      <View style={myStyles.hostImageContainer}>
        {hostData?.hostImages.length > 0 ? (
          hostData.hostImages.map((value, index) => (
            <View key={index}>
              <Image
                source={{ uri: value.ImageUri }}
                style={{ width: 150, height: 100, borderRadius: 10 }}
              />
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <IconButton
                  icon="delete"
                  size={20}
                  iconColor="red"
                  onPress={() => handleDeleteImage(value.ImageName)}
                />
              </View>
            </View>
          ))
        ) : (
          <Text>Debes dejar al menos una imagen de tu hospedaje</Text>
        )}
      </View>

      {errorImage && <Message msg={errorImage} type="error" />}

      {hostData?.hostImages.length < 3 && (
        <UploadImageModal visible={uploadImageModal} hideModal={handleUploadImageModal} uploadImage={handleAddImage}/>
      )}

    

      <View style={myStyles.btnsViewGuest}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("ViewHostGuest", { hostId: hostData._id })
          }
          style={myStyles.btnViewGuest}
          icon="account-group"
        >
          Ver Huespedes
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("ViewHostRating", { hostId: hostData._id })
          }
          style={myStyles.btnRating}
          icon="star"
        >
          Ver Calificaciones
        </Button>
      </View>

      <DeleteHost
        navigation={navigation}
        visible={deleteModal}
        hideModal={handleDeleteModal}
        hostOwnerId={user._id}
      />

      

      <Portal>
        <Modal visible={dltImageModal}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={45} />
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const myStyles = StyleSheet.create({
  modalUploadContainer: {
    padding: 10,
  },
  uploadViewContainer: {
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    /* alignItems:"center", */
    gap: 10,
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    padding: 10,
    /* display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start", */
  },
  imageStyle: {
    width: 300,
    height: 300,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    padding: 10,
  },
  notHostTitle: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  btnActionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnActionEditStyles: {
    textAlign: "center",
    fontSize: 25,
    /*  color:"" */
  },
  btnActionDltStyles: {
    textAlign: "center",
    color: "red",
    fontSize: 25,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  btnsViewGuest: {
    /*  padding:10, */
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 15,
  },
  inputNumberStyle: {
    width: 150,
  },
  btnViewGuest: {
    padding: 2,
    backgroundColor: Colors.principal,
    borderRadius: 10,
    width: 180,
  },
  btnRating: {
    padding: 2,
    backgroundColor: Colors.principal,
    borderRadius: 10,
    width: 180,
  },
  hostImageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
    flexWrap: "wrap",
  },
});
