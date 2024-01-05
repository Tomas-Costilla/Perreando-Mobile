import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { Avatar } from "react-native-ui-lib";
import { Colors } from "../tools/constant";
import { Image } from "expo-image";
import IconProperty from "../components/IconProperty";
import { server } from "../api/server";
import { useNavigation } from "@react-navigation/native";
import Message from "../components/Message";
import { useSelector } from "react-redux";

export default function TrayHostDetailScreen({ route }) {
  const { bookingItem } = route.params;
  const [loading,setLoading] = useState(false)
  const [confirmLoading,setConfirmLoading] = useState(false)
  const [error,setError] = useState("")
  const user = useSelector(state=>state.user.user)
  const navigation = useNavigation()

  const rejectGuestReserve = async () =>{
    setLoading(true)
    setError("")
    try {
        await server.put(`/tray/reject/${bookingItem._id}`,{
            bookingId: bookingItem.trayBookingId,
            hostId: user._id,
            hostEmail: user.userEmail,
            guestId: bookingItem.guestUserId,
            guestEmail: bookingItem.guestUserEmail
        })
        navigation.goBack()
    } catch (error) {
        if(error.response.data?.isLogged === false){
            navigation.navigate("SessionOut")
            return
        }

        if(error.response.data?.message) setError(error.response.data?.message)
        else setError("Ocurrio un error al querer rechazar la reserva")
    }
    setLoading(false)
  }

  const confirmGuestReserve = async () =>{
    setConfirmLoading(true)
    setError("")
    try {
        await server.put(`/tray/confirm/${bookingItem._id}`,{
            bookingId: bookingItem.trayBookingId,
            hostId: user._id,
            hostEmail: user.userEmail,
            guestId: bookingItem.guestUserId,
            guestEmail: bookingItem.guestUserEmail
        })
        navigation.goBack()
    } catch (error) {
        if(error.response.data?.isLogged === false){
            navigation.navigate("SessionOut")
            return
        }

        if(error.response.data?.message) setError(error.response.data?.message)
        else setError("Ocurrio un error al querer rechazar la reserva")
    }
    setConfirmLoading(false)
  }


  console.log(bookingItem);
  return (
    <View style={myStyles.container}>
      <View style={myStyles.detailContainer}>
        <View style={myStyles.petInfoStyle}>
          <Image
            source={{ uri: bookingItem.guestPetImageUrl }}
            style={myStyles.petImageStyle}
          />
          <IconProperty
            iconName="paw"
            text={bookingItem.guestPetName}
            iconSize={20}
            textStyles={myStyles.petNameStyle}
          />
        </View>
        <Divider />
        <View style={myStyles.avatarContainer}>
          <Avatar source={{ uri: bookingItem.guestImageUrl }} size={40} />
          <Text style={myStyles.userTitleStyle}>
            {bookingItem.guestFullName}
          </Text>
        </View>
        <View>
          <View style={myStyles.infoTitlesContainer}>
            <Text
              style={myStyles.titlesStyles}
            >
              Informacion del animal
            </Text>
            <IconProperty
              iconName="paw"
              text={`${bookingItem.guestPetAge} años`}
              iconSize={20}
            />
            <IconProperty
              iconName="paw"
              text={`${bookingItem.guestPetWeight} kilos`}
              iconSize={20}
            />
          </View>
          <View style={myStyles.infoTitlesContainer}>
            <Text style={myStyles.titlesStyles}>Fecha de estadia</Text>
            <IconProperty
              iconName="calendar-blank"
              text={`${bookingItem.bookingMomentStart} / ${bookingItem.bookingMomentEnd}`}
              iconSize={20}
            />
          </View>
         <View style={myStyles.infoTitlesContainer}>
         <IconProperty
            iconName="currency-usd"
            text={`Total importe de la estadia: $${bookingItem.bookingTotal}`}
            iconSize={20}
          />
         </View>
          <Text style={{textAlign:"center",color:Colors.textColor,marginTop:10,marginBottom:10}}>
            Fecha de solicitud de reserva: {bookingItem.bookingMomentCreated}
          </Text>
        </View>
        {error && <Message msg={error} type="error"/>}
        <View style={myStyles.btnContainer}>
          <Button 
            mode="outlined"
            icon="close"
            labelStyle={{color: Colors.textColor}}
            style={myStyles.btnCancelStyle}
            loading={loading}
            onPress={rejectGuestReserve}

            >Rechazar</Button>
          <Button 
            mode="contained"
            icon="check"
            style={myStyles.btnConfirmStyle}
            loading={confirmLoading}
            onPress={confirmGuestReserve}
            >Confirmar</Button>
        </View>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGrey,
    padding: 10,
  },
  detailContainer: {
    padding: 10,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
  },
  petImageStyle: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  guestImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  petInfoStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  petNameStyle: {
    fontSize: 20,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  userTitleStyle: {
    fontSize: 15,
  },
  infoTitlesContainer:{
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    padding: 5,
  },
  titlesStyles:{
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    gap:10,
    padding:10,
    marginTop:10,
    marginBottom:10 
  },
  btnConfirmStyle:{
    backgroundColor:Colors.principalBtn,
    padding:3,
    width:150
  },
  btnCancelStyle:{
    borderColor:Colors.textColor,
    padding:3,
    width:150
  }
});
