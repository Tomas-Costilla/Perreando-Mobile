import {} from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function Message({type,msg}){

    return <View style={[myStyles.container,type === "error" ? myStyles.errorColor : type === "success" ? myStyles.successColor : type === "warning" && myStyles.alertColor]}>
        <Icon name={type === "error" ? "alert-circle" : type === "success" ? "check-bold" : type === "warning" && "alert"} style={myStyles.icon}/>
        <Text style={myStyles.title}>{msg}</Text>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:10,
        display:"flex",
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        padding:10,
        borderRadius:10,
        gap:5

    },
    errorColor:{
        backgroundColor:"#F50000"
    },
    successColor:{
        backgroundColor:"#50CB00"
    },
    alertColor:{
        backgroundColor:"#F3C300"
    },
    icon:{
        color:"#FFFFFF"
    },
    title:{
        color:"#FFFFFF",
        fontWeight:"bold"
    }
})