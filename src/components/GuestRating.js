import {} from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import StarsRating from "./StarsRating";

export default function GuestRating({ data }) {
  return (
    <View style={myStyles.container}>
      <View style={myStyles.avatarContainer}>
        <Image style={myStyles.avatarStyle} source={{uri: data.userImageUri}} />
      </View>
      <View style={myStyles.dataContainer}>
        <View style={myStyles.userContainer}>
            <Text>{data.userFullName}</Text>
            <Text>{data.hostGuestComment}</Text>
        </View>
        <View style={myStyles.ratingContainer}>
            <StarsRating numberofStars={data.hostGuestRating} sizeStar={20}/>
        </View>
      </View>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#C6C6C6",
    gap: 10,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  avatarStyle: {
    width: 90,
    height: 90,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  userContainer:{
    
  }
});
