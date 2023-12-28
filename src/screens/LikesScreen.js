import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { server } from "../api/server";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { Colors } from "../tools/constant";
import { Image } from "expo-image";
import NotLikes from "../../assets/corazon-roto.gif"

export default function LikesScreen() {
  const user = useSelector((state) => state.user.user);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const getAllUserLikes = async () => {
    setLoading(true);
    try {
      let response = await server.get(`/like/${user._id}`);
      setLikes(response.data);
    } catch (error) {
      if (error.response.data?.isLogged === false) {
        navigation.navigate("SessionOut");
        return;
      }
      if (error.response.data?.message)
        setErrorServer(error.response.data?.message);
      else setErrorServer("Ocurrio un error con la peticion");
    }
    setLoading(false);
  };

 

  useEffect(() => {
    getAllUserLikes();
  }, [isFocused]);

  return (
    <View style={myStyles.container}>
      {errorServer ? (
        <Message msg={errorServer} type="error" />
      ) : loading ? (
        <Loading />
      ) : likes.length > 0 ? (
        <FlatList
          data={likes}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => navigation.navigate("ViewHost",{hostId: item.likeHostId})}
              activeOpacity={0.6}
              underlayColor={Colors.backgroundGrey}
              style={myStyles.touchableContainer}
            >
              <View style={myStyles.likeItemContainer}>
                <View style={myStyles.likeImageContainer}>
                  <Image source={{uri: item.hostImage}} style={myStyles.imageStyle}/>
                    <Text>{item.hostDescription}</Text>
                </View>
                {item.likeHostId ? <IconButton icon="chevron-right" size={35}/>
                : <IconButton icon="delete-outline" size={35}/>}
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={myStyles.notLikesContainer}>
          <Image source={NotLikes} style={myStyles.notLikeImage}/>
          <Text>¡Aun no tienes favoritos!</Text>
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
  notLikesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
    borderColor:Colors.borderColor,
    borderWidth:0.6,
    borderRadius:10,
    backgroundColor:Colors.backgroundColor,
    height:200
  },
  likeItemContainer:{
    borderRadius:10,
    borderWidth:0.6,
    borderColor:Colors.borderColor,
    backgroundColor:Colors.backgroundColor,
    padding:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  touchableContainer:{
    borderRadius:10
  },
  likeImageContainer:{
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  imageStyle:{
    borderRadius:10,
    width:60,
    height:60
  },
  notLikeImage:{
    width:100,
    height:100
  }
});
