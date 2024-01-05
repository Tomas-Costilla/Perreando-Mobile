import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Drawer, View } from "react-native-ui-lib";
import { useSelector } from "react-redux";
import { Colors } from "../tools/constant";
import { server } from "../api/server";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { Image } from "expo-image";
import IconProperty from "../components/IconProperty";


export default function TrayHostScreen({}) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isFocused = useIsFocused()

  const getAllBookingRequests = async () => {
    setLoading(true);
    setError("");
    try {
      let response = await server.get(`/tray/${user._id}`);
      setRequests(response.data);
    } catch (error) {
      if (error.response.data?.isLogged === false) {
        navigation.navigate("SessionOut");
        return;
      }
      if (error.response.data?.message) setError(error.response.data?.message);
      else setError("Ocurrio un error en la peticion");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllBookingRequests();
  }, [isFocused]);

  return (
    <View style={myStyles.container}>
      {error ? (
        <Message msg={error} type="error" />
      ) : loading ? (
        <Loading />
      ) : requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={()=>navigation.navigate("HostTrayDetail",{
              bookingItem: item
            })} activeOpacity={0.8}
            underlayColor={Colors.backgroundGrey} style={{borderRadius:10}}>
              <View style={myStyles.itemStyle}>
              <View style={myStyles.imageAndInfoContainer}>
                <Image
                  source={{ uri: item.guestPetImageUrl }}
                  style={myStyles.petImageStyle}
                />
                <View style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                  <IconProperty text={item.guestFullName} iconName="account-outline" iconSize={16}/>
                  <IconProperty text={item.guestPetName} iconName="paw-outline" iconSize={16}/>
                  <View style={myStyles.dateContainer}>
                    <IconProperty text={item.bookingMomentStart} iconName="calendar-outline" iconSize={16}/>
                    <Text>-</Text>
                    <Text>{item.bookingMomentEnd}</Text>
                  </View>
                  <IconProperty text={item.bookingTotal} iconName="currency-usd" iconSize={16}/>
                  <Text style={{fontWeight:"bold"}}>Estado: {item.trayStatus}</Text>
                </View>
              </View>
              <IconButton icon="chevron-right" size={30}/>
            </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View>
          <Text>Aun no tienes ninguna solicitud</Text>
        </View>
      )}
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGrey,
    padding: 10,
  },
  itemStyle: {
    backgroundColor:Colors.backgroundColor,
    borderWidth: 0.6,
    borderRadius: 10,
    borderColor: Colors.borderColor,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  imageAndInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
    padding: 5,
  },
  petImageStyle: {
    width: 80,
    height: 125,
    borderRadius: 5,
  },
  userImageStyle:{
    width:40,
    height:40,
    borderRadius:50
  }
});
