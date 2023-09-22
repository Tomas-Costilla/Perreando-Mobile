import {} from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import {Image} from "expo-image"
import { Colors } from "../tools/constant"

const {width,height} = Dimensions.get('screen')

export default function ImageItemSlide({image}){

    return <View style={myStyles.container}>
        <Image source={image} style={myStyles.image}/>
    </View>
}

const myStyles = StyleSheet.create({
    container:{
        width:400,
        alignItems:"center"
    },
    image:{
        width:350,
        height:350,
        borderRadius:10
    }
})