import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Text, Button, ActivityIndicator, IconButton, Portal, Modal } from "react-native-paper";
import InputView from "../components/InputView";
import { Colors } from "../tools/constant";
import DeleteHost from "../components/DeleteHost";
import { useSelector } from "react-redux";
import { server } from "../api/server";
import SinHospedaje from "../../assets/sinhospedaje.png"
import { Image } from "expo-image";
import Message from "../components/Message";





export default function ViewHostScreen({ navigation }) {
  const { user } = useSelector((state) => state.user);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hostData, setHostData] = useState({});
  const [dltImageModal,setDltImageModal] = useState(false)
  const [errorImage,setErrorImage] = useState("")

  const handleDeleteImageModal = () => setDltImageModal(!dltImageModal)

  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteImage = async (imageName) =>{
    setDltImageModal(true)
    try {
      let response = await server.delete(`/host/${hostData._id}/image/${imageName}`)
      setHostData({...hostData,hostImages: response.data})
    } catch (error) {
      setErrorImage("Ocurrio un error al eliminar la imagen")
    }
    setDltImageModal(false)
  }

  const getOwnerHostbyID = async () => {
    setLoading(true);
    try {
      const response = await server.get(`/host/owner/${user._id}`);
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
        <Image source={SinHospedaje} style={myStyles.imageStyle}/>
      </View>
    );

  return (
    <ScrollView style={myStyles.container}>
      {/*  <ScrollView> */}
      <View style={myStyles.btnActionContainer}>
        <Button
          icon="pencil"
          onPress={() => navigation.navigate("UpdateHostData",{hostDataId: user._id})}
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
        {hostData.hostImages.length > 0 ? hostData.hostImages.map((value,index)=> <View key={index}>
          <Image source={{uri: value.ImageUri}} style={{width:150,height:100}}/>
          <View style={{display:"flex",justifyContent:"center",flexDirection:"row",gap:10}}>
            <IconButton icon="delete" size={20} iconColor="red" onPress={()=>handleDeleteImage(value.ImageName)}/>
          </View>
        </View>) : <Text>Debes dejar al menos una imagen de tu hospedaje</Text>}
      </View>

      {errorImage && <Message msg={errorImage} type="error"/>}

      {hostData.hostImages.length < 3 && <View style={{display:"flex",justifyContent:"center",flexDirection:"row",padding:10,marginBottom:10,marginTop:10}}>
        <Button icon="plus" mode="text" onPress={()=>console.log("Agregar imagen")}>Agregar imagen</Button>
      </View>}


      <View style={myStyles.btnsViewGuest}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("ViewHostGuest",{hostId: hostData._id})}
          style={myStyles.btnViewGuest}
          icon="account-group"
        >
          Ver Huespedes
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("ViewHostRating",{hostId: hostData._id})}
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

      {/* <DeleteImageModal visible={dltImageModal} hideModal={handleDeleteImageModal} hostId={hostData._id} updateState={handleUpdateImages}/>
       */}

      <Portal>
          <Modal visible={dltImageModal}>
            <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <ActivityIndicator size={45}/>
            </View>
          </Modal>
      </Portal>

      {/* </ScrollView> */}
    </ScrollView>
  );
}

const myStyles = StyleSheet.create({
  modalContainer:{
    backgroundColor:Colors.backgroundColor,
    padding:10,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    borderRadius:10,
    alignItems:"center",
    gap:10
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    padding: 10
    /* display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start", */
  },
  imageStyle:{
    width:300,
    height:300
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
    alignItems:"center",
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
    marginBottom:15
  },
  inputNumberStyle: {
    width: 150,
  },
  btnViewGuest:{
    padding:2,
    backgroundColor:Colors.principal,
    borderRadius:10,
    width:180
  },
  btnRating:{
    padding:2,
    backgroundColor:Colors.principal,
    borderRadius:10,
    width:180
  },
  hostImageContainer:{
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"row",
    marginTop:10,
    marginBottom:10,
    gap:10,
    flexWrap:"wrap"
  }
});
