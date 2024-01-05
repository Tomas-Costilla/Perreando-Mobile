import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../tools/constant";
import { ActivityIndicator, HelperText, Text } from "react-native-paper";
import { server } from "../api/server";
import ItemSearch from "../components/ItemSearch";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

export default function SearchResultScreen({ route }) {
  const { state, city, total, age, weight, datefrom, dateto } = route.params;
  const [loadingReq, setLoadingReq] = useState(false);
  const [errorReq, setErrorReq] = useState("");
  const [hostData, setHostData] = useState([]);
  const navigation = useNavigation()

  const getAllHostByFilter = async () => {
    setErrorReq("")
    setLoadingReq(true)
    try {
        let response = await server.get(`/host/filter?state=${state}&city=${city}&total=${total}&age=${age}&weight=${weight}&datefrom=${datefrom}&dateto=${dateto}`)
        setHostData(response.data)
    } catch (error) {
        if(error.response.data?.isLogged){
            navigation.navigate("SessionOut")
            return
        }

        if(error.response.data?.message) setErrorReq(error.response.data?.message)
        else setErrorReq("Ocurrio un error en la peticion")
    }
    setLoadingReq(false)

  };

  useEffect(() => {
    getAllHostByFilter();
  }, []);

  return (
    <View style={myStyles.container}>
      {errorReq ? (
        <Message msg={errorReq} type="error" />
      ) : loadingReq ? (
        <Loading />
      ) : hostData.length > 0 ? (
        <FlatList
          data={hostData}
          renderItem={({ item }) => (
            <ItemSearch data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={myStyles.notDataContainer}>
            <Text>No se encontraron resultados!</Text>
        </View>
      )}
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.backgroundGrey,
  },
  loadingReq: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  notDataContainer:{
    
  }
});
