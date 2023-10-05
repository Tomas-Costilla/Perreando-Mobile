import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  HelperText,
  Text,
} from "react-native-paper";
import { server } from "../api/server";
import { Colors, PROFILE_TYPES } from "../tools/constant";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CreateReserve from "../components/CreateReserve";
import { useSelector } from "react-redux";
import ContactBtn from "../components/ContactBtn";
import ImageCarrousel from "../components/ImageCarrousel";

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

  const getHostbyId = async () => {
    setLoadingReq(true);
    setErrorServer("");
    try {
      const response = await server.get(`/host/${hostId}`);
      setHostData(response.data);
    } catch (error) {
      setErrorServer(error.response.data);
    }
    setLoadingReq(false);
  };

  useEffect(() => {
    getHostbyId();
  }, [hostId]);

  if (loadingReq)
    return (
      <View style={myStyles.serverResContainer}>
        <ActivityIndicator animating size={45} />
      </View>
    );

  if (errorServer)
    return (
      <View style={myStyles.serverResContainer}>
        <HelperText type="error">{errorServer}</HelperText>
      </View>
    );

    
    return (
    <ScrollView style={myStyles.container}>
      <View style={myStyles.hostContainer}>
        <View style={myStyles.userContainer}>
          <Avatar.Image source={{ uri: hostData.ImageUri }} size={35} />
          <View>
            {/*  <Text style={myStyles.userHostDescription}>{hostData.hostDescription}</Text> */}
            <Text style={myStyles.userName}>
              {hostData.hostOwnerId?.userFullName}
            </Text>
          </View>
        </View>
        <ImageCarrousel images={hostData.hostImages} />

        <View style={myStyles.userInfoContainer}>
          <Text style={{ textAlign: "center",fontWeight:"bold",fontSize:16,marginBottom:10}}>
            {hostData.hostDescription}
          </Text>
          <PropertyWithIcon icon="currency-usd" text={`Costo total de estadia: $${hostData.hostPrice}`} size={25}/>
          <PropertyWithIcon icon="email-outline" text={hostData.hostOwnerId?.userEmail} size={25}/>
          <PropertyWithIcon icon="phone" text={hostData.hostOwnerId?.userPhone} size={25}/>
          <PropertyWithIcon icon="paw" text={`Capacidad: ${hostData.hostOwnerCapacity}`} size={25}/>
          <PropertyWithIcon icon="weight-kilogram" text={`Peso admitido: ${hostData.hostAnimalWeightFrom} - ${hostData.hostAnimalWeightTo} KG`} size={25}/>
          <PropertyWithIcon icon="account-heart" text={`Edad admitida: ${hostData.hostAnimalAgeFrom} - ${hostData.hostAnimalAgeTo} años`} size={25}/>
          <PropertyWithIcon icon="account-group" text={`Huespedes activos: ${hostData.totalActiveGuest}`} size={25}/>
          <PropertyWithIcon icon="map-marker-account" text={`${hostData.hostOwnerId?.userAddressStreet} ${hostData.hostOwnerId?.userAddressNumber}, Entre ${hostData.hostOwnerId?.userAddressBetwStreet}. ${hostData.hostLocation}`} size={25}/>
          <Text>{`Informacion extra: ${hostData.hostOwnerId?.userAddressExtraInfo}`}</Text>
        </View>

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
          />
          <Button
            mode="outlined"
            icon="comment"
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
              navigation.navigate("ConfirmReserve", {
                hostId: hostId,
                guestId: user._id,
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
    backgroundColor: Colors.backgroundColor,
  },
  serverResContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  hostContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    borderColor: "#CACACA",
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
    borderColor: Colors.secondary,
    borderRadius: 10,
    padding: 3,
  },
  btnCommentFont: {
    color: Colors.secondary,
  },
  btnReserveStyle: {
    borderRadius: 10,
    backgroundColor: Colors.principal,
    padding: 5,
    width: 250,
    marginTop: 5,
    marginBottom: 10,
  },
});
