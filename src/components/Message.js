import {} from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Message({ type, msg }) {
  return (
    <View
      style={[
        myStyles.container,
        type === "error"
          ? myStyles.errorColor
          : type === "success"
          ? myStyles.successColor
          : type === "warning" && myStyles.alertColor,
      ]}
    >
      <Icon
        name={
          type === "error"
            ? "alert-circle"
            : type === "success"
            ? "check-bold"
            : type === "warning" && "alert"
        }
        style={
            type === "error"
            ? myStyles.errorColorIcon
            : type === "warning" 
            ? myStyles.alertColorIcon
            : myStyles.successColorIcon
        }
        size={20}
      />
      <Text 
        style={
            type === "error"
            ? {color: "#F50000"}
            : type === "warning"
            ? {color :"#F3C300"}
            : {color: "#50CB00"}
        }
        
        >{msg}</Text>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  errorColorIcon: {
    //backgroundColor:"#F50000"
    color:"#F50000"
  },
  successColorIcon: {
    //backgroundColor:"#50CB00"
    color:"#50CB00"
  },
  alertColorIcon: {
    //backgroundColor:"#F3C300"
    color:"#F3C300"
  },
  icon: {
    color: "#FFFFFF",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
