import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, IconButton, Text } from "react-native-paper";
import IconProperty from "./IconProperty";
import { Colors } from "../tools/constant";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { server } from "../api/server";
import Message from "./Message";
import Loading from "./Loading";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export const ActiveHost = ({ storeUser /* , refreshData */}) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [hostData, setHostData] = useState({});
  const isFocused = useIsFocused()

  const getHostByOwner = async () => {
    setLoading(true);
    setErrorServer("")
    console.log(storeUser._id)
    try {
      let {data} = await server.get(`/host/status/${storeUser._id}`);
      console.log(data)
      setHostData(data)
    } catch (error) {
      console.log(error.response.data)

      if(error.response.data?.isLogged===false){
        navigation.navigate("SessionOut")
        return
      }
      if (error.response.data?.message) setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error en la peticion");
    }
    setLoading(false);
  };

  useEffect(() => {
    getHostByOwner();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : Object.keys(hostData).length===0 ? (
        <View style={myStyles.notHostContainer}>
          <IconProperty
            iconName="home"
            iconSize={20}
            text="Aun no tienes un hospedaje creado"
          />
          <Button
            mode="outlined"
            labelStyle={{ color: Colors.textColor }}
            icon="plus-thick"
            style={{width:200}}
            onPress={()=>navigation.navigate("UploadImages")}
          >
            Crear
          </Button>
        </View>
      ) : (
        <View style={myStyles.hostContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <IconProperty
              iconName="home-circle"
              iconSize={30}
              text={hostData.hostDescription}
            />
            
          </View>
          <Divider />
          <View style={myStyles.statusHost}>
              <View style={myStyles.iconTextContainer}>
                <Icon name="account-group-outline" size={25} color={Colors.textColor} />
                <Text>{hostData.countActiveGuest} Huespedes activos</Text>
              </View>
              <View style={myStyles.iconTextContainer}>
                <Icon name="star-outline" size={25} color={Colors.textColor}/>
                <Text>{hostData.countRating} Calificaciones</Text>
              </View>
              <View style={myStyles.iconTextContainer}>
                <Icon name="comment-outline" size={25} color={Colors.textColor}/>
                <Text>{hostData.countComments} Comentarios</Text>
              </View>
              <View style={myStyles.iconTextContainer}>
                <Icon name="calendar-outline" size={25} color={Colors.textColor}/>
                <Text>{hostData.countActiveBooking} Reservas confirmadas</Text>
              </View>
            </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Button
              mode="contained"
              style={{ backgroundColor:Colors.principalBtn,width:250 }}
              onPress={()=>navigation.navigate("ViewHostData")}
            >
              Ver detalle
            </Button>
          </View>
        </View>
      )}
    </>
  );
};


const myStyles = StyleSheet.create({
  container: {},
  hostContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.borderColor,
    height:300,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    gap:5,
    backgroundColor:Colors.backgroundColor
   /*  alignItems:"center" */
  },
  notHostContainer: {
    height:250,
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    padding: 10,
    borderRadius: 10,
    backgroundColor:Colors.backgroundColor
  },
  notBookingContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    borderRadius: 10,
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    borderWidth: 0.6,
    borderRadius: 10,
    /* width: 'auto', */
    gap:5,
    borderColor: Colors.borderColor,
  },
  statusHost: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    gap: 5,
  },
  bookingsContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  bookingItemContainer: {
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
