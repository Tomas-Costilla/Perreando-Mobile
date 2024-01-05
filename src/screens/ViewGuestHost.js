import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  HelperText,
  IconButton,
  Text,
} from "react-native-paper";
import { server } from "../api/server";
import { Colors, PROFILE_TYPES } from "../tools/constant";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CreateReserve from "../components/CreateReserve";
import { useSelector } from "react-redux";
import ContactBtn from "../components/ContactBtn";
import ImageCarrousel from "../components/ImageCarrousel";
import Loading from "../components/Loading";
import Message from "../components/Message";
import IconProperty from "../components/IconProperty";

const PropertyWithIcon = ({ text, icon, size }) => {
  return (
    <View style={myStyles.propertyContainer}>
      <Icon name={icon} size={size} />
      <Text style={{textAlign:"justify"}}>{text}</Text>
    </View>
  );
};

export default function ViewGuestHost({ navigation, route }) {
  const { hostId } = route.params;
  const user = useSelector((state) => state.user.user);
  const [loadingReq, setLoadingReq] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [hostData, setHostData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLike,setIsLike] = useState(false)

  const getHostbyId = async () => {
    setLoadingReq(true);
    setErrorServer("");
    try {
      const {data} = await server.get(`/host/${hostId}`);
      const likeResponse = await server.get(`/like/${hostId}/${user._id}`)
      if(likeResponse.data) setIsLike(true)
      setHostData(data.result);
    } catch (error) {
      if(error.response.data?.isLogged===false) {
        navigation.navigate("SessionOut")
        return
      }
      if(error.response.data?.message) setErrorServer(error.response.data?.message)
      else setErrorServer("Ocurrio un error en la peticion")
    }
    setLoadingReq(false);
  };

  const handleAddLike = async () =>{
    setIsLike(true)
    try {
      await server.post("/like",{
        likeHostId: hostId,
        likeGuestId: user._id
      })
    } catch (error) {
      if(error.response.data?.isLogged === false){
        navigation.navigate("SessionOut")
        return
      }
      if(error.response.data?.message) setIsLike(false)
      else setIsLike(false)
    }
  }

  const handleDeleteLike = async () =>{
    setIsLike(false)
    try {
      await server.delete(`/like/${hostId}/${user._id}`)
    } catch (error) {
      if(error.response.data?.isLogged===false){
        navigation.navigate("SessionOut")
        return
      }
      if(error.response.data?.message) setIsLike(true)
      else setIsLike(true)
    }
  }

  useEffect(() => {
    getHostbyId();
  }, [hostId]);

  if (loadingReq) return <Loading />

  if (errorServer) return <Message msg={errorServer} type="error"/>

    
    return (
    <ScrollView style={myStyles.container}>
      <View style={myStyles.userContainer}>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",gap:5}}>
            <Avatar.Image source={{ uri: hostData.ImageUri }} size={35} />
              <Text style={myStyles.userName}>
                {hostData.hostOwnerId?.userFullName}
              </Text>
          </View>
          <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          {isLike ? <IconButton icon="heart" size={30} onPress={handleDeleteLike} iconColor="#FF0000"/>
          : <IconButton icon="heart-outline" size={30} onPress={handleAddLike}/>}
         {/*  <IconButton 
            icon="message-outline"
            size={35}
          /> */}
          </View>
        </View>
      <View style={myStyles.hostContainer}>
        <ImageCarrousel images={hostData?.hostImages} />

        <View style={myStyles.userInfoContainer}>
          <IconProperty iconName="home" text={hostData.hostDescription} iconSize={25}/>
          <Text>{hostData.hostPresentation}</Text>
          <IconProperty iconName="currency-usd" text={`Costo total de estadia: $${hostData.hostPrice}`} iconSize={25}/>
          <IconProperty iconName="email-outline" text={hostData.hostOwnerId?.userEmail} iconSize={25}/>
          <IconProperty iconName="phone-outline" text={hostData.hostOwnerId?.userPhone} iconSize={25}/>
          <IconProperty iconName="paw-outline" text={`Capacidad: ${hostData.hostOwnerCapacity}`} iconSize={25}/>
          <IconProperty iconName="weight-kilogram" text={`Peso admitido: ${hostData.hostAnimalWeightFrom} - ${hostData.hostAnimalWeightTo} KG`} iconSize={25}/>
          <IconProperty iconName="account-heart-outline" text={`Edad admitida: ${hostData.hostAnimalAgeFrom} - ${hostData.hostAnimalAgeTo} años`} iconSize={25}/>
          <IconProperty iconName="account-group-outline" text={`Huespedes activos: ${hostData.totalActiveGuest}`} iconSize={25}/>
          <IconProperty iconName="map-marker-account" text={`${hostData.hostCompleteAddress}. ${hostData.hostState}, ${hostData.hostCity}`} iconSize={25}/>
          <IconProperty iconName="calendar-outline" text="Disponibilidad" iconSize={25}/>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",gap:5}}>
            <Text>Desde {hostData.hostAvailableStartDate}</Text>
            <Text>-</Text>
            <Text>Hasta {hostData.hostAvailableStartEnd}</Text>
          </View>

          <Text style={myStyles.createdDate}>Fecha de publicacion: {hostData.hostCreatedAt}</Text>
          
        </View>
      </View>
      <View style={myStyles.buttonContainer}>
      <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            flexDirection: "row",
            padding: 5,
            alignItems: "center",
          }}
        >
          <ContactBtn
            phone={hostData.hostOwnerId?.userPhone}
            message="Hola!, estoy interesado en tu alojamiento"
            textBtn="Contactar"
          />
          <Button
            mode="outlined"
            icon="comment-outline"
            style={myStyles.btnCommentStyle}
            labelStyle={myStyles.btnCommentFont}
            onPress={() =>
              navigation.navigate("ViewComments", { hostId: hostId })
            }
          >
            Ver comentarios
          </Button>
        </View>
      

        {user.userProfile === PROFILE_TYPES.HUESPED && <View style={myStyles.btnContainer}>
          <Button
            mode="contained"
            style={myStyles.btnReserveStyle}
            onPress={() =>
              navigation.navigate("SelectPet", {
                hostId: hostId,
                guestId: user._id,
                hostPrice: hostData.hostPrice,
                hostAvailableStartDate: hostData.hostAvailableStartDate,
                hostAvailableStartEnd:hostData.hostAvailableStartEnd
              })
            }
          >
            Reservar
          </Button>
        </View>}
      </View>
    </ScrollView>
  );
}

const myStyles = StyleSheet.create({
  propertyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.backgroundGrey
  },
  serverResContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  hostContainer: {
    marginTop: 5,
    borderRadius:10,
    borderWidth:1,
    borderColor:Colors.borderColor,
    backgroundColor:Colors.backgroundColor,
    marginBottom:5
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor:Colors.backgroundColor,
    borderRadius:10,
    borderWidth:0.6,
    borderColor:Colors.borderColor
  },
  userName: {
    fontSize: 15,
  },
  userHostDescription: {
    fontSize: 13,
  },
  userImageContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  userImage: {
    width: 400,
    height: 300,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  userInfoContainer: {
    /*  borderWidth:0.5,
        borderRadius:10, */
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    borderColor: "#CACACA",
    gap:10
  },
  ubicationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 5,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  btnCommentStyle: {
    padding: 3,
  },
  btnCommentFont: {
    color: Colors.textColor,
  },
  btnReserveStyle: {
    backgroundColor: Colors.principalBtn,
    padding: 3,
    width: 250,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer:{
    borderRadius:10,
    borderColor:Colors.borderColor,
    borderWidth:0.6,
    backgroundColor:Colors.backgroundColor,
    padding:5,
    marginBottom:20
  },
  createdDate:{
    color:"#8C8C8C",
    fontSize:10,
    textAlign:"center"
  }
});
