import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { Colors } from "../../tools/constant";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { server } from "../../api/server";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { Image } from "expo-image";
import SinMascota from "../../../assets/sinMascota.gif"


export default function SelectPetScreen({ route }) {
  const navigation = useNavigation();
  const [myPets, setMyPets] = useState([]);
  const [errorServer, setErrorServer] = useState("");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused()

  const getAllUserPets = async () => {
    setLoading(true);
    setErrorServer("");
    try {
      let { data } = await server.get(`/pet/owner/${route.params.guestId}`);
      setMyPets(data.newPetsDataWithImageUrl)
    } catch (error) {
      if (error.response.data?.isLogged === false) {
        navigation.navigate("SessionOut");
        return;
      }

      if (error.response.data?.message)
        setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error en la peticion");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUserPets();
  }, [isFocused]);

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.title}>Selecciona tu mascota a hospedar</Text>
      {errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : loading ? (
        <Loading />
      ) : myPets.length === 0 ? (
        <View style={myStyles.notPetsContainer}>
          <Image source={SinMascota} style={myStyles.notPetImage}/>
          <Text>¡Aun no tienes cargado una mascota!</Text>
          <Button
            mode="outlined"
            icon="paw"
            labelStyle={{color:Colors.textColor}}
            style={myStyles.btnAddPaw}
            onPress={()=>navigation.navigate("AddPet")}
          >Agregar Mascota</Button>
        </View>
      ) : (
        <FlatList 
            data={myPets}
            renderItem={({item}) => <View style={myStyles.petContainer}>
                <View style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",alignItems:"center",gap:10}}>
                    <Image source={{uri: item.petImageUrl}} style={myStyles.petImage}/>
                    <Text style={{fontSize:15}}>{item.petName}</Text>
                </View>
                <IconButton 
                    icon="chevron-right"
                    size={35}
                    onPress={()=>navigation.navigate("ConfirmReserve",{...route.params,petId: item._id,petName:item.petName})}
                />
            </View>}
            keyExtractor={item => item._id}
        />
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
  title: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  notPetsContainer:{
    marginTop:10,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    gap:5
  },
  notPetImage:{
    width:100,
    height:100
  },
  btnAddPaw:{
    width:250,
    marginTop:10
  },
  petContainer:{
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    marginTop:10,
    borderRadius:10,
    borderColor:Colors.borderColor,
    borderWidth:1,
    padding:10
  },
  petImage:{
    width:60,
    height:60,
    borderRadius:10
  }
});
