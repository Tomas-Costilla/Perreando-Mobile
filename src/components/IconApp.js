import {} from "react"
import { Image, StyleSheet, View } from "react-native"
import {Text} from "react-native-paper"
import IconAppImage from "../../assets/iconapp.png"

export default function IconApp({}){
    return <View style={myStyles.container}>
        <Image source={IconAppImage} style={myStyles.imageStyle}/>
        <Text style={myStyles.title}>Perreando</Text>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        marginLeft:5
    },
    imageStyle:{
        width:30,
        height:30
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    }
})