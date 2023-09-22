import {} from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { Colors } from "../tools/constant"


export default function Loading({}){

    return <View style={myStyles.container}>
        <ActivityIndicator animating size={45}/>
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