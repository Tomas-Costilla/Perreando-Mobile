import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List, Searchbar, Text } from "react-native-paper";
import { Colors } from "../../tools/constant";
import { server } from "../../api/server";
import Message from "../../components/Message";
import Loading from "../../components/Loading";

export default function SelectState({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [stateData, setStateData] = useState([]);
  const [prevStateData,setPrevStateData] = useState([])
  const [searchData,setSearchData] = useState("")


    const handleSearchData = value =>{
        if(!value) setStateData(prevStateData)
        else{
            setSearchData(value)
            let regex = new RegExp(value,'i')
            let newStatesArray = stateData.filter(item=> regex.test(item.nombre))
            setStateData(newStatesArray)
        }
    }

  const handleStateData = (state) => {
    navigation.navigate(route.params.screenBack, {
      ...route.params,
      state: state,
    });
  };

  const getAllState = async () => {
    setLoading(true);
    setErrorServer("");
    try {
      let response = await server.get("/user/states");
      setStateData(response.data);
      setPrevStateData(response.data)
    } catch (error) {
        /* if(error.response.data?.isLogged===false) navigation.navigate("SessionOut") */
      if (error.response.data?.message)
        setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error en la peticion");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllState();
  }, []);

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.title}>Selecciona la provincia de donde perteneces</Text>
      <Searchbar 
        placeholder="Buscar provincia..."
        onChangeText={value=>handleSearchData(value)}
        style={{marginBottom:10,marginTop:10,backgroundColor:Colors.subColor}}
        
      />
      {errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : loading ? (
        <Loading />
      ) : (
        stateData.length>0 && (
          <FlatList
            data={stateData}
            renderItem={({ item }) => (
              <List.Item
                title={item.nombre}
                onPress={() => handleStateData(item.nombre)}
                left={props => <List.Icon {...props} icon="map-marker-outline"/>}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )
      )}
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 10,
  },
  title:{
    textAlign:"center",
    fontSize:15,
    marginBottom:10
  }
});
