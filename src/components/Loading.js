import {} from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { Colors } from "../tools/constant"
import LottieView from "lottie-react-native"


export default function Loading({}){

    return <View style={myStyles.container}>
        <ActivityIndicator color={Colors.subColor} animating size={50}/>
        {/* <LottieView source={require('../../assets/animations/loadingAnimation.json')} autoPlay loop /> */}
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