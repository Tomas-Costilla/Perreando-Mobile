import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Colors } from "../../tools/constant";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { server } from "../../api/server";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { Image } from "expo-image";
import SinMascota from "../../../assets/sinMascota.gif"

export default function MyPetsScreen() {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [myPets, setMyPets] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getAllMyPets = async () => {
    setLoading(true);
    setErrorServer("");
    try {
      let { data } = await server.get(`/pet/owner/${user._id}`);
      setMyPets(data.newPetsDataWithImageUrl);
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

  const handleDeletePet = async (petId) =>{
    try {
      await server.delete(`/pet/${petId}`)
      getAllMyPets()
    } catch (error) {
      if (error.response.data?.isLogged === false) {
        navigation.navigate("SessionOut");
        return;
      }
    }
  }

  useEffect(() => {
    getAllMyPets();
  }, [isFocused]);

  return (
    <View style={myStyles.container}>
      <Text style={myStyles.title}>Mis mascotas</Text>
      {errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : loading ? (
        <Loading />
      ) : myPets.length > 0 ? (
        <View style={myStyles.myPetContainer}>
          {myPets.map((value, index) => (
            <View key={index} style={myStyles.itemContainer}>
              <View style={myStyles.imageContainer}>
                <Image
                  source={{ uri: value.petImageUrl }}
                  style={myStyles.imageStyle}
                />
                <Text style={myStyles.petNameStyle}>{value.petName}</Text>
              </View>
              <View style={myStyles.iconsContainer}>
                <IconButton
                  icon="image-edit"
                  size={30}
                  iconColor={Colors.textColor}
                  onPress={()=>navigation.navigate("UpdateImagePaw",{
                        pawImage: value.petImageUrl,
                        petId:value._id,
                        petImageName:value.petImageName
                    })}
                />
                <IconButton
                  icon="pencil-circle"
                  size={30}
                  iconColor={Colors.textColor}
                  onPress={()=>navigation.navigate("EditPet",{petData: value})}
                />
                <IconButton
                  icon="delete-circle"
                  size={30}
                  iconColor={Colors.errorColor}
                  onPress={()=>handleDeletePet(value._id)}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={myStyles.notPetContainer}>
          <Image source={SinMascota} style={myStyles.gifStyle}/>
          <Text>¡Aun no tienes mascotas cargadas!</Text>
        </View>
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
    fontSize: 18,
    fontWeight: "bold",
  },
  myPetContainer: {
    marginTop: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: 10,
  },
  notPetContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginTop: 20
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  petNameStyle: {
    fontSize: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  gifStyle:{
    width:200,
    height:200
  }
});
