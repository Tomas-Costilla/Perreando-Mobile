import {} from "react"
import { StyleSheet, View } from "react-native"
import { HelperText, Text } from "react-native-paper"
import { Colors } from "../tools/constant"


export default function MessageServer({msg}){

    return <View style={myStyles.container}>
        <HelperText type="error">{msg}</HelperText>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:Colors.backgroundColor
    }
})